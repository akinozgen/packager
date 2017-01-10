const fs = require('fs');
const http = require('http');
const unzip = require('unzip');
const fstream = require('fstream');
const jsonFile = require('jsonfile');

var installPackage = {

    destination: typeof process.argv[4] != 'undefined' ? process.argv[4] : (process.env.PROGRAMS + '\\'),

    checkExists: function (code)
    {
        var installed = jsonFile.readFileSync(process.env.PROGRAMS + '\\installed.json');
        var packages = installed.packages;

        if (typeof packages[code] != 'undefined')
            return false;
        else
            return true;
    },
    check: function (code)
    {
        var file = fs.readFileSync('latest.json');
        try {
            var latest = JSON.parse(file);
            if (typeof latest.packages[code] != 'undefined')
                return latest.packages[code];
            else return false;
        }
        catch (e)
        {
            console.log('Hata: '.red, 'Depo dosyanız bozuk. \'packager guncelle\' komutu ile düzeltin.');
        }
    },
    download: function(package, version, code)
    {
        var state = false;
        var url = package.versions[version];
        var des = (process.env.TEMP + '\\' + package.name + '-' + version + '.zip');

        var file = fs.createWriteStream(des);

        var request = http.get(url, function (response) {
            response.pipe(file);
            console.log("Devam Ediyor: ".blue, package.name + " paketi geçici dizine indiriliyor.", des);
            response.on('end', function () {
                console.log('Başarılı: '.green, package.name + " paketi geçici dizine indirildi.", des);
                installPackage.unzip(des, code);
                installPackage.register(code);
                console.log('Başarılı: '.green, 'Paket kuruldu.');
            });
        });
    },
    unzip: function(source, code)
    {
        var path = (installPackage.destination + '\\' + code);

        if ( ! fs.existsSync(path))
            fs.mkdirSync(path);

        var read  = fs.createReadStream(source);
        var write = fstream.Writer(path);

        read.pipe(unzip.Parse()).pipe(write);
    },
    register: function (code)
    {
        var latest = jsonFile.readFileSync('./latest.json');
        var installed = jsonFile.readFileSync(process.env.PROGRAMS + '\\installed.json');
        installed.packages[code] = latest.packages[code];
        installed.packages[code]['installation_path'] = installPackage.destination + '\\' + code;

        jsonFile.writeFileSync(process.env.PROGRAMS + '\\installed.json', installed);
    },

    batch: function(code)
    {
        var package = installPackage.check(code);
        var check = installPackage.checkExists(code);
        if (package && check)
        {
            console.log('Başarılı: '.green, ' Paket bulundu. Sürüm: ', package.version);
            var download = installPackage.download(package, package.version, code);
        }
        else
        {
            if (package == false)
                console.log('\nUyarı: '.yellow, code + ' paketi bulunamadı. Kodu doğru yazdığınızdan veya deponuzun güncel olduğundan emin olun.');
            else
                console.log('\nUyarı: '.yellow, 'Bu paket zaten kurulu.');
        }
    }

};

module.exports = installPackage;
