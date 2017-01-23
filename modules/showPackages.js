const colors = require('colors')
const jsonFile = require('jsonfile')
const easyTable = require('easy-table')

var showPackages = function (options) {

    var latest = jsonFile.readFileSync(__dirname + '/../latest.json')

    var tableData = latest.packages
    var table = new easyTable

    if (Object.keys(tableData).length > 0 && options.parent.type == 'konsol')
    {
        Object.keys(tableData).forEach(function (key) {
            var package = tableData[key]
            table.cell('Code'.cyan, (key).cyan)
            table.cell('Name'.green, package.name)
            table.cell('Last Version'.green, package.version)
            table.cell('Provider'.green, package.provider)
            table.cell('Website'.green, package.website)
            table.newRow()
        })
        console.log(table.toString())
    }
    else if (Object.keys(tableData).length > 0 && options.parent.type == 'handler')
    {
        // output
    }
    else
    {
        if (options.parent.type == 'konsol')
        {
            require('log-timestamp')
            console.log('No Information'.yellow)
        }
        else
        {
            console.log('NOVERSION')
        }
    }

}

module.exports = showPackages;
