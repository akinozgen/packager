const installed = require('./init')()
const Output    = require('./output')

var packageWhere = function (code, options) {

    var out      = new Output(options)
    var packages = installed.packages
    if (packages[code])
    {
        var requested = packages[code]
        out.prepare('%s is installed on:'.green + ' %s'.cyan, [requested.name, requested.installation_path])
    }
    else
    {
        out.prepare("Warning:".yellow + " It is not installed.")
    }

    out.out()
}

module.exports = packageWhere
