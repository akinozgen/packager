const colors       = require('colors')
const Output       = require('./output')
const jsonFile     = require('jsonfile')
const easyTable    = require('easy-table')
const js2xmlparser = require('js2xmlparser')
const SearchInJson = require('./searchInJson')

var getInstalledPackages = function (options) {
    var out              = new Output(options)
    var installed        = jsonFile.readFileSync(process.env.PROGRAMS + '\\installed.json')
    var tableData        = installed.packages
    var category         = options.parent.category // @category

    var table = new easyTable

    if (Object.keys(tableData).length > 0 && options.parent.type == 'konsol')
    {
        Object.keys(tableData).forEach(function (key) {
            var package = tableData[key]
            // Filter by @category
            var search = new SearchInJson(package['categories'], category)
            if (category != '' && ! search.getResult())
                return false

            table.cell('Code'.cyan, (key).cyan)
            table.cell('Name'.green, package.name)
            table.cell('Version'.green, package.version)
            table.cell('Provider'.green, package.provider)
            table.cell('Categories'.green, JSON.stringify(package.categories))
            table.cell('Website'.green, package.website)
            table.newRow()
        });
        if (Object.keys(table['rows']).length > 0)
            out.prepare(table.toString(), undefined, {'timestamp': false})
        else
            out.prepare('NOPACKAGEFOUND')
    }
    else if (Object.keys(tableData).length > 0 && options.parent.type == 'handler')
    {
        out.prepare(js2xmlparser.parse("packages", tableData), undefined, {'timestamp': false})
    }
    else
    {
        out.prepare('NOPACKAGEFOUND')
    }

    out.out()
}

module.exports = getInstalledPackages
