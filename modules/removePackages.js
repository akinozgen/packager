const Package = require('./package');

var removePackages = function (code, options) {
    console.log('\r');
    if (options.parent.tip == 'konsol')
        require('log-timestamp')

    var pack = new Package(code, 'local')

    if ( ! pack.isInstalled())
    {
        if (options.parent.tip == 'konsol')
            console.log('Bu paket zaten kurulu değil.'.yellow)
        process.exit(1)
    }

    pack.remove(function (message, code) {
        if (options.parent.tip == 'konsol')
            console.log(message)
        else
            console.log(code)
    })

};

module.exports = removePackages;
