const fs = require('fs');
const http = require('http');
const unzip = require('unzip');
const fstream = require('fstream');

var installPackage = {
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
                installPackage.install(des, process.env.PROGRAMS + '\\' + code);
                console.log('Başarılı: '.green, 'Paket kuruldu.');
            });
        });
    },
    install: function(source, path)
    {
        fs.mkdirSync(path);
        var read  = fs.createReadStream(source);
        var write = fstream.Writer(path);

        read.pipe(unzip.Parse()).pipe(write);
    },
    batch: function(code)
    {
        var package = installPackage.check(code);
        if (package)
        {
            console.log('Başarılı: '.green, ' Paket bulundu. Sürüm: ', package.version);
            var download = installPackage.download(package, package.version, code);

        }
        else
        {
            if (package == false)
                console.log('\nUyarı: '.yellow, code + ' paketi bulunamadı. Kodu doğru yazdığınızdan veya deponuzun güncel olduğundan emin olun.');
        }
    }
};

module.exports = installPackage;
