const fs = require('fs');
const jsonFile = require('jsonfile');

var installPackage = {
    check: function (code)
    {
        var file = fs.readFileSync('latest.json');
        try {
            var latest = JSON.parse(file);
            if (typeof latest.packages[code] != 'undefined')
                return latest.packages[code].version;
            else return false;
        }
        catch (e)
        {
            console.log('Hata: '.red, 'Depo dosyanız bozuk. \'packager guncelle\' komutu ile düzeltin.');
        }
    },
    download: function(code)
    {

    },
    install: function(code)
    {

    },
    batch: function(code)
    {
        var checking = installPackage.check(code);
        if (checking)
            console.log('\nBaşarılı: '.green, code + ' paketi bulundu. Son sürüm: ', checking);
        else
        {
            if (checking == false)
                console.log('\nUyarı: '.yellow, code + ' paketi bulunamadı. Kodu doğru yazdığınızdan veya deponuzun güncel olduğundan emin olun.');
        }
    }
};

module.exports = installPackage;
