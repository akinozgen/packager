const colors = require('colors')
const jsonFile = require('jsonfile')
const easyTable = require('easy-table')

var showPackages = function (options) {

    var latest = jsonFile.readFileSync(__dirname + '/../latest.json')

    var tableData = latest.packages
    var table = new easyTable

    if (Object.keys(tableData).length > 0 && options.parent.tip == 'konsol')
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
    else if (Object.keys(tableData).length > 0 && options.parent.tip == 'handler')
    {
        // output
    }
    else
    {
        if (options.parent.tip == 'konsol')
        {
            require('log-timestamp')
            console.log('Bilgi bulunamadı'.yellow)
        }
        else
        {
            console.log('NOVERSION')
        }
    }

}

module.exports = showPackages;
