const colors = require('colors')
const Package = require('./package')
const jsonFile = require('jsonfile');
const easyTable = require('easy-table')

var getVersions = function (code, options)
{
    var index = 1
    var pack = new Package(code, 'remote')
    if ( ! pack.isExists())
    {
        require('log-timestamp')
        console.log('Paket bulunamadı.'.yellow)
        process.exit(1)
    }

    var tableData = pack.versions
    var table = new easyTable

    if (Object.keys(tableData).length > 0 && options.parent.tip == 'konsol')
    {
        Object.keys(tableData).forEach(function (key) {
            var version = tableData[key]
            table.cell('Kod'.cyan, (key).cyan)
            table.cell('Açıklama'.green, version.description)
            table.cell('İndirme Linki'.green, version.download)
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
            console.log('Bu pakete ait sürüm bulunamadı. Bu paket kurulamaz.')
        }
        else
        {
            console.log('NOVERSIONFOUND')
        }
        process.exit(1)
    }
}

module.exports = getVersions
