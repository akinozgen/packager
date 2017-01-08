const fs = require('fs');
const jsonFile = require('jsonfile');
const updateRepositories = require('./updateRepositories');

var installPackage = {
    check: function (code)
    {
        var latest = jsonFile.readFile('./latest.json', function(err) {
            if (String(err).indexOf('Unexpected end of JSON input') > -1)
                console.log('Hata: '.red, "Yerel depo dosyası bozuk. 'packager guncelle' komutu ile düzeltin.");
        });
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
        {
            console.log('\nBaşarılı: '.green, code + ' paketi bulundu. Son sürüm: ', checking);
        }
    }
};

module.exports = installPackage;
