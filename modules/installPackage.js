const Package = require('./package');

var installPackage = function (code, version, destination) {
    console.log('\r');
    require('log-timestamp')

    var pack = new Package(code, 'remote', destination, version)

    if ( ! pack.isExists())
    {
        console.log('Böyle bir paket bulunamadı.'.yellow)
        process.exit(1)
    }
    else
    {
        console.log('Paket bulundu. Kurulum birazdan başlayacak'.green)
    }

    if (pack.isInstalled())
    {
        console.log('Bu paket zaten kurulmuş.'.yellow)
        process.exit(1)
    }

    pack.downloadAndInstall(function (message) {
        console.log(message)
    })
};

module.exports = installPackage;
