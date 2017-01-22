var Package = require('./package')

var run = function (code, options)
{
    if (options.parent.tip == 'konsol')
        require('log-timestamp')
    var pack = new Package(code, 'local')

    if ( ! pack.isExists())
    {
        if (options.parent.tip == 'konsol')
            console.log('Böyle bir paket bulunamadı.'.yellow)
        else
            console.log('PACKAGENOTFOUND')
        process.exit(1)
    }

    if ( ! pack.isInstalled())
    {
        if (options.parent.tip == 'konsol')
            console.log('Bu paket henüz kurulmamış.'.yellow)
        else
            console.log('NOTINSTALLED')
        process.exit(1)
    }

    pack.run(function (message, code) {
        if (options.parent.tip == 'konsol')
            console.log(message)
        else
            console.log(code)
    })
}

module.exports = run
