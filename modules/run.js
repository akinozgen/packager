var Package = require('./package')

var run = function (code, options)
{
    if (options.parent.type == 'konsol')
        require('log-timestamp')
    var pack = new Package(code, 'local', undefined, undefined, options)

    if ( ! pack.isExists())
    {
        if (options.parent.type == 'konsol')
            console.log('Package not found.'.yellow)
        else
            console.log('PACKAGENOTFOUND')
        process.exit(1)
    }

    if ( ! pack.isInstalled())
    {
        if (options.parent.type == 'konsol')
            console.log("It ain't installed".yellow)
        else
            console.log('NOTINSTALLED')
        process.exit(1)
    }

    pack.run(function (message, code) {
        if (options.parent.type == 'konsol')
            console.log(message)
        else
            console.log(code)
    })
}

module.exports = run
