const Package = require('./package')
const Output  = require('./output')

var removePackages = function (code, options) {

    var out  = new Output(options)
    var pack = new Package(code, 'local', undefined, undefined, options)

    if ( ! pack.isInstalled())
    {
        out.prepare('NOTINSTALLED', [pack.name])
        out.out()
        process.exit(1)
    }

    pack.remove(function (message, code) {
        out.prepare(message, code)
        out.out()
    })

}

module.exports = removePackages
