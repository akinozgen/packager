const fs = require('fs');
const exec = require('child_process').exec;
const jsonFile = require('jsonfile');

var removePackages = {

    remove: function (code) {

        var installed = require('./init')();
        packages = installed.packages;

        if (packages[code])
        {
            var path = packages[code].installation_path;

            try {
                delete packages[code];
                installed['packages'] = packages;

                jsonFile.writeFile(process.env.PROGRAMS + '\\installed.json', installed, function (err) {
                    if (err)
                    {
                        console.log('\nHata: '.red, err);
                        return;
                    }
                    else
                    {
                        exec("rmdir /Q /S " + '"' + path + '"', function (err, stdout, stderr) {
                            if (err) {
                                console.error('\nHata: '.red, 'Sistem belirtilen konumu bulamıyor >', path);
                                return;
                            }
                            else
                            {
                                console.log('\nBaşarılı: '.green, 'Belirttiğiniz paket kaldırıldı');
                            }
                        });
                    }
                });
            } catch (Exception) {
                console.log('\nHata: '.red, 'Paket kaldırılırken bir sorun oluştu. Yönetici ayarları ile tekrar deneyin...');
            }
        }
        else {
            console.log('\nUyarı: '.yellow,  'Belirttiğiniz paket zaten kurulu değil.');
        }
    }

};

module.exports = removePackages;
