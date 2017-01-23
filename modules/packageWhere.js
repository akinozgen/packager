var installed = require('./init')();

var packageWhere = function (code, options) {

    var packages = installed.packages
    if (packages[code])
    {
        var requested = packages[code]
        if (options.parent.type == 'konsol')
            console.log('\n' + requested.name + ' is installed on: ', requested.installation_path)
        else
            console.log('PATH:' + requested.installation_path)
    }
    else
    {
        if (options.parent.type == 'konsol')
            console.log("\nUyarı".yellow, "It ain't installed.")
        else
            console.log('NOTINSTALLED')
    }

}

module.exports = packageWhere;
