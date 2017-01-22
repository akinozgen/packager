var installed = require('./init')();

var packageWhere = function (code, options) {

    var packages = installed.packages;
    if (packages[code])
    {
        var requested = packages[code];
        console.log('\n' + requested.name + ' paketinin kurulu olduğu dizin: ', requested.installation_path);
    }
    else
    {
        console.log("\nUyarı".yellow, "Belirtilen paket zaten kurulu değil.");
    }

}

module.exports = packageWhere;
