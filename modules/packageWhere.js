var installed = require('./init')();

var packageWhere = function (code, options) {

    var packages = installed.packages
    if (packages[code])
    {
        var requested = packages[code]
        if (options.parent.tip == 'konsol')
            console.log('\n' + requested.name + ' paketinin kurulu olduğu dizin: ', requested.installation_path)
        else
            console.log('PATH:' + requested.installation_path)
    }
    else
    {
        if (options.parent.tip == 'konsol')
            console.log("\nUyarı".yellow, "Belirtilen paket zaten kurulu değil.")
        else
            console.log('NOTINSTALLED')
    }

}

module.exports = packageWhere;
