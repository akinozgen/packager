const installed = require('./init')()
const Output    = require('./output')

var packageWhere = function (code, options) {

    var out      = new Output(options)
    var packages = installed.packages
    if (packages[code])
    {
        var requested = packages[code]
        out.prepare('INSTALLEDON', [requested.name, requested.installation_path])
    }
    else
    {
        out.prepare('NOTINSTALLED')
    }

    out.out()
}

module.exports = packageWhere
