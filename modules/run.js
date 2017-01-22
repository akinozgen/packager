var Package = require('./package')

var run = function (code, options)
{
    require('log-timestamp')
    var pack = new Package(code, 'local')

    if ( ! pack.isExists())
    {
        console.log('Böyle bir paket bulunamadı.'.yellow)
        process.exit(1)
    }

    if ( ! pack.isInstalled())
    {
        console.log('Bu paket henüz kurulmamış.'.yellow)
        process.exit(1)
    }

    pack.run(function (message) {
        console.log(message)
    })
}

module.exports = run
