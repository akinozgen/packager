const easyTable = require('easy-table');
const colors = require('colors');
var installed = require('./init')();

var getInstalledPackages = function () {
    var tableData = installed.packages;

    var table = new easyTable;

    console.log('');
    Object.keys(tableData).forEach(function (key) {
        var package = tableData[key];
        table.cell('Program Adı'.green, package.name);
        table.cell('Sürüm'.green, package.version);
        table.cell('Sahibi'.green, package.provider);
        table.cell('Website'.green, package.website);
        table.newRow(); 
    });

    console.log(table.toString());
}

module.exports = getInstalledPackages;