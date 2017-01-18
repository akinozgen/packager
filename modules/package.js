const fs = require('fs')
const exec = require('child_process').exec;
const request = require('request')
const unzip = require('unzip')
const fstream = require('fstream')
const jsonFile = require('jsonfile')
const ProgressBar = require('progress');

var package = function (code, fromWhere, toWhere, version) {

    this.name              = ''
    this.version           = ''
    this.provider          = ''
    this.executable        = ''
    this.installation_path = ''
    this.versions          = {}
    this.latest            = jsonFile.readFileSync('./latest.json')
    this.installed         = jsonFile.readFileSync(process.env.PROGRAMS + '\\installed.json')

    if (fromWhere == 'remote')
    {
        if (typeof this.latest.packages[code] != 'undefined')
        {
            this.name              = this.latest.packages[code].name
            this.versions          = this.latest.packages[code].versions
            this.provider          = this.latest.packages[code].provider
            this.executable        = this.latest.packages[code].executable
            if (typeof version != 'undefined')
                this.version = version
            else
                this.version = this.latest.packages[code].version

            if (typeof toWhere != 'undefined')
                this.installation_path = (toWhere + '\\' + code)
            else
                this.installation_path = (process.env.PROGRAMS + '\\' + code)

        }
    }
    else
    {
        if (typeof this.installed.packages[code] != 'undefined')
        {
            this.name              = this.installed.packages[code].name
            this.provider          = this.installed.packages[code].provider
            this.executable        = this.installed.packages[code].executable
            this.installation_path = this.installed.packages[code].installation_path
            if (typeof version != 'undefined')
                this.version = version
            else
                this.version = this.latest.packages[code].version
        }
    }

    this.isInstalled = function ()
    {
        if (typeof this.installed.packages[code] != 'undefined')
            return true
        else
            return false
    }

    this.isExists = function ()
    {
        if (typeof this.latest.packages[code] != 'undefined')
            return true
        else
            return false
    }

    this.downloadAndInstall = function (callback)
    {
        var url       = this.versions[this.version].download
        var temporary = (process.env.TEMP + '\\' + this.name + '-' + this.version + '.zip')
        var file      = fs.createWriteStream(temporary)

        var req = request.get(url)
        req.on('response', function (response) {
            callback(('Uzak sunucu isteği kabul etti. Kod: ' + response.statusCode).green)
            callback((this.name + " geçici dizine indiriliyor.").cyan)

            var len = parseInt(response.headers['content-length'], 10)

            var bar = new ProgressBar('İndiriliyor [:bar] :percent :etas', {
                complete: '#',
                incomplete: '-',
                width: '60',
                total: len
            })

            response.on('data', function (data) {
                try {
                    bar.tick(data.length)
                } catch (err) {
                    callback(('Bağlantı hatası. Hata Kodu: ' + err).red)
                    process.exit(1)
                }
            })
        }.bind(this))
        req.on('error', function (err) {
            callback(('Bağlantı Hatası. Hata kodu: ' + err.code).red)
        })
        req.on('end', function () {
            callback((this.name + " geçici dizine indirildi.").green)

            // Unzip Begin
            callback('Arşivden çıkartılmaya başlandı.'.cyan)
            if ( ! fs.existsSync(this.installation_path) )
                fs.mkdirSync(this.installation_path)

            var read  = fs.createReadStream(temporary)
            var write = fstream.Writer(this.installation_path)

            read.pipe(unzip.Parse()).pipe(write)
            callback('Arşivden çıkartma başarılı.'.green)
            // Unzip End | Register Begin
            callback('Yeni paket yerel depoya kayıt ediliyor.'.cyan)
            this.installed.packages[code] = this.latest.packages[code]
            this.installed.packages[code]['version'] = this.version
            this.installed.packages[code]['installation_path'] = this.installation_path
            delete this.installed.packages[code]['versions']
            // console.log(this.installed)
            jsonFile.writeFileSync(process.env.PROGRAMS + '\\installed.json', this.installed)
            // Register End
            callback('Kayıt işlemi tamamlandı ve belirtilen paket kuruldu.'.green)
        }.bind(this)).pipe(file)
    }

    this.remove = function (callback)
    {
        if (fs.existsSync(this.installation_path))
            exec('rmdir /s /q "' + this.installation_path + '"', function () {
                callback('Yerel dosyalar silindi.'.green)

                delete this.installed.packages[code]
                jsonFile.writeFile(process.env.PROGRAMS + '\\installed.json', this.installed, function (err) {
                    if (err)
                        callback(err)
                    else
                        callback('Yerel depodan kaldırıldı.'.green)
                }.bind(this))

            }.bind(this))
        else
            callback('Yerel dosyalar bulunamadı.'.red)
    }

}

module.exports = package
