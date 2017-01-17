const Package = require('./package');

var installPackage = function (code) {
    console.log('\r');
    require('log-timestamp')

    var version     = typeof process.argv[4] != 'undefined' ? process.argv[4] : undefined
    var destination = typeof process.argv[5] != 'undefined' ? process.argv[5] : undefined

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
