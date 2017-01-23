const colors = require('colors')
const jsonFile = require('jsonfile')
const easyTable = require('easy-table')

var getInstalledPackages = function (options) {
    var installed = jsonFile.readFileSync(process.env.PROGRAMS + '\\installed.json')
    var tableData = installed.packages

    var table = new easyTable

    if (Object.keys(tableData).length > 0 && options.parent.type == 'konsol')
    {
        Object.keys(tableData).forEach(function (key) {
            var package = tableData[key]
            table.cell('Code'.cyan, (key).cyan)
            table.cell('Name'.green, package.name)
            table.cell('Version'.green, package.version)
            table.cell('Provider'.green, package.provider)
            table.cell('Website'.green, package.website)
            table.newRow()
        });
        console.log(table.toString())
    }
    else if (Object.keys(tableData).length > 0 && options.parent.type == 'handler')
    {
        // output
    }
    else
    {
        if (options.parent.type == 'konsol')
            console.log('\nWarning: '.yellow, 'No package found installed.')
        else
            console.log('NOPACKAGEINSTALLED')
    }

}

module.exports = getInstalledPackages
