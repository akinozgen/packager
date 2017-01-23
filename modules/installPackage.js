const Package = require('./package');

var installPackage = function (code, version, destination, options) {
    console.log('\r');
    if (options.parent.type == 'konsol')
        require('log-timestamp')

    var pack = new Package(code, 'remote', destination, version, options)

    if ( ! pack.isExists())
    {
        if (options.parent.type == 'konsol')
            console.log('Package not found.'.yellow)
        else
            console.log('PACKAGENOTFOUND')
        process.exit(1)
    }
    else
    {
        if (options.parent.type == 'konsol')
            console.log('Package found. It will be install soon'.green)
        else
            console.log('PACKAGEFOUND')
    }

    if (pack.isInstalled())
    {
        if (options.parent.type == 'konsol')
            console.log('This package allready installed.'.yellow)
        else
            console.log('ALREADYINSTALLED')
        process.exit(1)
    }

    pack.downloadAndInstall(function (message, code) {
        if (options.parent.type == 'konsol')
            console.log(message)
        else
            console.log(code)
    })
};

module.exports = installPackage;
