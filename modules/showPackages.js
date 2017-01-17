const colors = require('colors')
const jsonFile = require('jsonfile')
const easyTable = require('easy-table')

var showPackages = function () {

    var latest = jsonFile.readFileSync('./latest.json')

    var tableData = latest.packages
    var table = new easyTable

    if (Object.keys(tableData).length > 0)
    {
        Object.keys(tableData).forEach(function (key) {
            var package = tableData[key]
            table.cell('Kod'.cyan, (key).cyan)
            table.cell('\nProgram Adı'.green, package.name)
            table.cell('Son Sürüm'.green, package.version)
            table.cell('Sahibi'.green, package.provider)
            table.cell('Website'.green, package.website)
            table.newRow()
        })
        console.log(table.toString())
    }
    else
    {
        require('log-timestamp')
        console.log('Bilgi bulunamadı'.yellow)
    }

}

module.exports = showPackages;
