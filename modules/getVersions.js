const colors       = require('colors')
const Output       = require('./output')
const Package      = require('./package')
const jsonFile     = require('jsonfile')
const easyTable    = require('easy-table')
const js2xmlparser = require('js2xmlparser')

var getVersions = function (code, options)
{
    var out    = new Output(options)
    var pack   = new Package(code, 'remote', undefined, undefined, options)
    if ( ! pack.isExists())
    {
        out.prepare('%s package not found.'.yellow, [code])
        out.out()
        process.exit(1)
    }

    var tableData = pack.versions
    var table = new easyTable

    if (Object.keys(tableData).length > 0 && options.parent.type == 'konsol')
    {
        Object.keys(tableData).forEach(function (key) {
            var version = tableData[key]
            table.cell('Code'.cyan, (key).cyan)
            table.cell('Description'.green, version.description)
            table.cell('Download Link'.green, version.download)
            table.newRow()
        })
        out.prepare(table.toString(), undefined, {'timestamp':false})
    }
    else if (Object.keys(tableData).length > 0 && options.parent.type == 'handler')
    {
        // Because XML keys cannot be start with a number or special characters...
        Object.keys(tableData).forEach(function (key) {
            tableData['version:' + key] = tableData[key]
            delete tableData[key]
        })

        out.prepare(js2xmlparser.parse("packages", tableData), undefined, {'timestamp':false})
    }
    else
    {
        out.prepare('Not a version found of this package. It cant be install.')
        out.out()
        process.exit(1)
    }
    out.out()
}

module.exports = getVersions
