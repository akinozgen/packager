const Output  = require('./output')
const Package = require('./package')

var installPackage = function (code, version, destination, options) {

    var out  = new Output(options)
    var pack = new Package(code, 'remote', destination, version, options)

    if ( ! pack.isExists())
    {
        out.prepare('PACKAGENOTFOUND', [code])
        out.out()
        process.exit(1)
    }
    else
    {
        out.prepare('PACKAGEFOUND')
        out.out()
    }

    if (pack.isInstalled())
    {
        out.prepare('INSTALLED')
        out.out()
        process.exit(1)
    }

    pack.downloadAndInstall(function (message, code) {
        out.prepare(message, code)
        out.out()
    })

}

module.exports = installPackage
