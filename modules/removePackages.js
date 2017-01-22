const Package = require('./package');

var removePackages = function (code, options) {
    console.log('\r');
    require('log-timestamp')

    var pack = new Package(code, 'local')

    if ( ! pack.isInstalled())
    {
        console.log('Bu paket zaten kurulu değil.'.yellow)
        process.exit(1)
    }

    pack.remove(function (message) {
        console.log(message)
    })

};

module.exports = removePackages;
