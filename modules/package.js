const fs = require('fs')
const http = require('http')
const unzip = require('unzip')
const fstream = require('fstream')
const jsonFile = require('jsonfile')

var package = function (code, fromWhere, toWhere) {

    this.name              = ''
    this.version           = ''
    this.provider          = ''
    this.executable        = ''
    this.installation_path = ''
    this.versions          = {}
    this.latest            = jsonFile.readFileSync('./latest.json')
    this.installed         = jsonFile.readFileSync(process.env.PROGRAMS + '\\installed.json')

    if (fromWhere == 'repo')
    {
        if (typeof this.latest.packages[code] != 'undefined')
        {
            this.name              = this.latest.packages[code].name
            this.version           = this.latest.packages[code].version
            this.versions          = this.latest.packages[code].versions
            this.provider          = this.latest.packages[code].provider
            this.executable        = this.latest.packages[code].executable
            if (typeof toWhere != 'undefined')
                this.installation_path = toWhere
            else
                this.installation_path = (process.env.PROGRAMS + '\\' + code)

        }
    }
    else
    {
        if (typeof this.installed.packages[code] != 'undefined')
        {
            this.name              = this.installed.packages[code].name
            this.version           = this.installed.packages[code].version
            this.provider          = this.installed.packages[code].provider
            this.executable        = this.installed.packages[code].executable
            this.installation_path = this.installed.packages[code].installation_path
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
        var url       = this.versions[this.version]
        var temporary = (process.env.TEMP + '\\' + this.name + '-' + this.version + '.zip')
        var file      = fs.createWriteStream(temporary)

        var request   = http.get(url, function (response) {//Request Begin
            response.pipe(file)
            callback("Devam Ediyor: ".blue, package.name + " paketi geçici dizine indiriliyor.")

            response.on('end', function () {
                callback('Başarılı: '.green, package.name + " paketi geçici dizine indirildi.")

                // Unzip Begin
                if ( ! fs.existsSync(this.installation_path) )
                    fs.mkdirSync(this.installation_path)

                var read  = fs.createReadStream(temporary)
                var write = fstream.Writer(this.installation_path)

                read.pipe(unzip.Parse()).pipe(write)
                // Unzip End | Register Begin
                this.installed.packages[code] = this.latest.packages[code]
                this.installed.packages[code]['installation_path'] = this.installation_path
                // console.log(this.installed)
                jsonFile.writeFileSync(process.env.PROGRAMS + '\\installed.json', this.installed)
                // Register End
                callback("Başarılı: ".green, 'Belirtilen paket kuruldu.')

                callback('done') // Done
            }.bind(this))
        }.bind(this))// Request End
    }

}

module.exports = package
