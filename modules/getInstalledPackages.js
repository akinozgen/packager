const colors = require('colors')
const jsonFile = require('jsonfile')
const easyTable = require('easy-table')

var getInstalledPackages = function () {
    var installed = jsonFile.readFileSync(process.env.PROGRAMS + '\\installed.json')
    var tableData = installed.packages

    var table = new easyTable

    if (Object.keys(tableData).length > 0)
    {
        Object.keys(tableData).forEach(function (key) {
            var package = tableData[key]
            table.cell('Program Adı'.green, package.name)
            table.cell('Sürüm'.green, package.version)
            table.cell('Sahibi'.green, package.provider)
            table.cell('Website'.green, package.website)
            table.newRow()
        });
        console.log(table.toString())
    }
    else
    {
        console.log('\nUyarı: '.yellow, 'Hiç kurulu paketiniz yok.')
    }

}

module.exports = getInstalledPackages
