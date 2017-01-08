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
    download: function(package)
    {
        var url =
    },
    install: function(code)
    {

    },
    batch: function(code)
    {
        var package = installPackage.check(code);
        if (package)
        {
            console.log('\nBaşarılı: '.green, code + ' paketi bulundu. Son sürüm: ', package.version);
        }
        else
        {
            if (package == false)
                console.log('\nUyarı: '.yellow, code + ' paketi bulunamadı. Kodu doğru yazdığınızdan veya deponuzun güncel olduğundan emin olun.');
        }
    }
};

module.exports = installPackage;
