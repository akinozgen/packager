const colors = require('colors')
const Package = require('./package')
const jsonFile = require('jsonfile')
const easyTable = require('easy-table')
const js2xmlparser = require('js2xmlparser')

var getVersions = function (code, options)
{
    var index = 1
    var pack = new Package(code, 'remote', undefined, undefined, options)
    if ( ! pack.isExists())
    {
        require('log-timestamp')
        console.log('Package Not Found.'.yellow)
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
        console.log(table.toString())
    }
    else if (Object.keys(tableData).length > 0 && options.parent.type == 'handler')
    {
        // Because XML keys cannot be start with a number or special characters...
        Object.keys(tableData).forEach(function (key) {
            tableData['version:' + key] = tableData[key]
            delete tableData[key]
        })

        console.log(js2xmlparser.parse("packages", tableData))
    }
    else
    {
        if (options.parent.type == 'konsol')
        {
            require('log-timestamp')
            console.log('Not a version found of this package. It cant be install.')
        }
        else
        {
            console.log('NOVERSIONFOUND')
        }
        process.exit(1)
    }
}

module.exports = getVersions
