const colors       = require('colors')
const Output       = require('./output')
const jsonFile     = require('jsonfile')
const easyTable    = require('easy-table')
const js2xmlparser = require('js2xmlparser')

var showPackages = function (options) {

    var out       = new Output(options)
    var latest    = jsonFile.readFileSync(process.env.PROGRAMS + '\\repository.json')
    var tableData = latest.packages
    var table     = new easyTable

    if (Object.keys(tableData).length > 0)
    {
        Object.keys(tableData).forEach(function (key) {
            var package = tableData[key]
            table.cell('Code'.cyan, (key).cyan)
            table.cell('Name'.green, package.name)
            table.cell('Last Version'.green, package.version)
            table.cell('Provider'.green, package.provider)
            table.cell('Categories'.green, JSON.stringify(package.categories))
            table.cell('Website'.green, package.website)
            table.newRow()
            // Because XML keys cannot be start with a number or special characters...
            Object.keys(tableData[key]['versions']).forEach(function (ver) {
                tableData[key]['versions']['version:' + ver] = tableData[key]['versions'][ver]
                delete tableData[key]['versions'][ver]
            })
        })
        if (options.parent.type == 'konsol')
            out.prepare(table.toString(), undefined, {'timestamp':false})
        else
            out.prepare(js2xmlparser.parse('packages', tableData), undefined, {'timestamp':false})
    }
    else
    {
        out.prepare('NOPACKAGEFOUND')
    }

    out.out()
}

module.exports = showPackages;
