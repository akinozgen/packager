const fs = require('fs');
const http = require('http');

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
    download: function(package, version)
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
            });
        });

        if (fs.existsSync(des))
            state = true;

        return {
            "path": des,
            "state": state
        };
    },
    install: function(code)
    {

    },
    batch: function(code)
    {
        var package = installPackage.check(code);
        if (package)
        {
            var download = installPackage.download(package, package.version);
            console.log('\nBaşarılı: '.green, code + ' paketi bulundu. Son sürüm: ', package.version);
            if (download.state)
            {
                //kur
            }
            else
            {
                console.log('Hata: '.red, 'Dosya indirilemedi. İnternet bağlantınızı kontrol edip tekrar deneyin.');
            }
        }
        else
        {
            if (package == false)
                console.log('\nUyarı: '.yellow, code + ' paketi bulunamadı. Kodu doğru yazdığınızdan veya deponuzun güncel olduğundan emin olun.');
        }
    }
};

module.exports = installPackage;
