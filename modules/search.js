const js2xmlparser = require('js2xmlparser')
const Output       = require('./output')
const easyTable    = require('easy-table')
const progress     = require('progress')
const jsonFile     = require('jsonfile')
const Package      = require('./package')

var search = function (string, options)
{

    var out  = new Output(options)
    var found = {}
    var packages = jsonFile.readFileSync(process.env.PROGRAMS + '\\repository.json').packages
    var len = Object.keys(packages).length

    var progressBar = new progress('Searching in the repository [:bar] :percent :etas', {
        complete: '#',
        incomplete: '-',
        width: 40,
        total: len
    })

    Object.keys(packages).forEach(function (key) {
        progressBar.tick(1)
        var package = new Package(key, 'remote', undefined, undefined, options)
        var searchIn = ('|' + key + package.name + '|' + package.provider + '|' + package.website + '|');

        Object.keys(package.versions).forEach(function (ver) {
            searchIn += (package.versions[ver].description + '|')
            package.versions['version:' + ver] = package.versions[ver]
            delete package.versions[ver]
        })

        if (searchIn.toLowerCase().search(string.toLowerCase()) > -1)
        {
            found[key] = {}
            found[key]['code']       = key
            found[key]['name']       = package.name
            found[key]['version']    = package.version
            found[key]['website']    = package.website
            found[key]['provider']   = package.provider
            found[key]['categories'] = package.categories
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
                table.cell('Categories'.green, JSON.stringify(package.categories))
                table.cell('Website'.green, package.website)
                table.newRow()
            })
            out.prepare(table.toString(), undefined, {'timestamp':false})
        }
        else
        {
            out.prepare(js2xmlparser.parse('packages', found), undefined, {'timestamp':false})
        }
    }
    else
    {
        out.prepare('NOPACKAGEFOUND')
    }

    out.out()
}

module.exports = search
