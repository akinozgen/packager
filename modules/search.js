const jsonFile = require('jsonfile')
const Package = require('./package')
const easyTable = require('easy-table')
const js2xmlparser = require('js2xmlparser')

var search = function (string, options)
{

    var found = {}
    var packages = jsonFile.readFileSync(__dirname + '/../latest.json').packages

    Object.keys(packages).forEach(function (key) {
        var package = new Package(key, 'remote', undefined, undefined, options)
        var searchIn = ('|' + package.name + '|' + package.provider + '|' + package.website + '|');

        Object.keys(package.versions).forEach(function (ver) {
            searchIn += (package.versions[ver].description + '|')
            package.versions['version:' + ver] = package.versions[ver]
            delete package.versions[ver]
        })

        if (searchIn.toLowerCase().search(string.toLowerCase()) > -1)
        {
            found[key] = {}
            found[key]['code'] = key
            found[key]['name'] = package.name
            found[key]['version'] = package.version
            found[key]['provider'] = package.provider
            found[key]['website'] = package.website
        }
    })

    if (Object.keys(found).length > 0)
    {
        if (options.parent.type == 'konsol')
        {
            var table = new easyTable

            Object.keys(found).forEach(function (key) {
                var package = found[key]
                table.cell('Code'.cyan, (key).cyan)
                table.cell('Name'.green, package.name)
                table.cell('Version'.green, package.version)
                table.cell('Provider'.green, package.provider)
                table.cell('Website'.green, package.website)
                table.newRow()
            })
            console.log(table.toString())
        }
        else
        {
            console.log(js2xmlparser.parse('packages', found))
        }
    }
    else
    {
        if (options.parent.type == 'konsol')
        {
            console.log()
            require('log-timestamp')
            console.log('No packages found.'.yellow)
        }
        else
            console.log('NOPACKAGESFOUND')
    }

}

module.exports = search
