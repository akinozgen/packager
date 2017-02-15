const colors       = require('colors')
const Output       = require('./output')
const jsonFile     = require('jsonfile')
const easyTable    = require('easy-table')
const js2xmlparser = require('js2xmlparser')
const SearchInJson = require('./searchInJson')

var showPackages = function (options) {

    var out       = new Output(options)
    var latest    = jsonFile.readFileSync(process.env.PROGRAMS + '\\repository.json')
    var tableData = latest.packages
    var category  = options.parent.category
    var table     = new easyTable

    if (Object.keys(tableData).length > 0 && options.parent.type == 'konsol')
    {
        Object.keys(tableData).forEach(function (key) {
            var package = tableData[key]
            var search  = new SearchInJson(package.categories, category)

            if (category != '' && ! search.getResult())
                return false

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

        if (Object.keys(table['rows']).length > 0)
            out.prepare(table.toString(), undefined, {'timestamp':false})
        else
            out.prepare('NOPACKAGEFOUND')
    }
    else if (Object.keys(tableData).length > 0 && options.parent.type == 'handler')
    {
        Object.keys(tableData).forEach(function (key, index) {
            var package = tableData[key]
            Object.keys(package['versions']).forEach(function (ver, index) {
                package['versions']['version:' + ver] = package.versions[ver]
                delete package.versions[ver]
                delete package['after']
            })
        })
        out.prepare(js2xmlparser.parse('packages', tableData), undefined, {'timestamp':false})
    }
    else
    {
        out.prepare('NOPACKAGEFOUND')
    }

    out.out()
}

module.exports = showPackages;
