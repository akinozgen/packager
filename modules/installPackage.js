const Package = require('./package');

var installPackage = function (code, version, destination, options) {
    console.log('\r');
    if (options.parent.tip == 'konsol')
        require('log-timestamp')

    var pack = new Package(code, 'remote', destination, version)

    if ( ! pack.isExists())
    {
        if (options.parent.tip == 'konsol')
            console.log('Böyle bir paket bulunamadı.'.yellow)
        else
            console.log('PACKAGENOTFOUND')
        process.exit(1)
    }
    else
    {
        if (options.parent.tip == 'konsol')
            console.log('Paket bulundu. Kurulum birazdan başlayacak'.green)
        else
            console.log('PACKAGEFOUND')
    }

    if (pack.isInstalled())
    {
        if (options.parent.tip == 'konsol')
            console.log('Bu paket zaten kurulmuş.'.yellow)
        else
            console.log('ALREADYINSTALLED')
        process.exit(1)
    }

    pack.downloadAndInstall(function (message, code) {
        if (options.parent.tip == 'konsol')
            console.log(message)
        else
            console.log(code)
    })
};

module.exports = installPackage;
