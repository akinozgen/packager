var installed = require('./init')();

var packageWhere = function (code) {

    var packages = installed.packages;
    if (packages[code])
    {
        var requested = packages[code];
        console.log(requested.name + " paketinin kurulu olduğu dizin: ", requested.installation_path);
    }
    else
    {
        console.log("Uyarı".yellow, "Belirtilen paket zaten kurulu değil.");
    }

}

module.exports = packageWhere;