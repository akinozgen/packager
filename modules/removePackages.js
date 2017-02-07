const Package = require('./package');

var removePackages = function (code, options) {

    if (options.parent.type == 'konsol')
        require('log-timestamp')

    var pack = new Package(code, 'local', undefined, undefined, options)

    if ( ! pack.isInstalled())
    {
        if (options.parent.type == 'konsol')
            console.log('It ain\'t installed.'.yellow)
        process.exit(1)
    }

    pack.remove(function (message, code) {
        if (options.parent.type == 'konsol')
            console.log(message)
        else
            console.log(code)
    })

};

module.exports = removePackages;
