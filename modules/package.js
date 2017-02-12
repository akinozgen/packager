const fs = require('fs')
const exec = require('child_process').exec
const unzip = require('unzip')
const fstream = require('fstream')
const md5File = require('md5-file')
const request = require('request')
const jsonFile = require('jsonfile')
const ProgressBar = require('progress')
const updateRepositories = require('./updateRepositories')

var package = function (code, fromWhere, toWhere, version, options) {

    this.name              = ''
    this.version           = ''
    this.provider          = ''
    this.website           = ''
    this.executable        = ''
    this.installation_path = ''
    this.versions          = {}
    this.categories        = []
    this.after             = {}
    this.latest            = jsonFile.readFileSync(process.env.PROGRAMS + '\\repository.json')
    this.installed         = jsonFile.readFileSync(process.env.PROGRAMS + '\\installed.json')

    if (fromWhere == 'remote')
    {
        if (typeof this.latest.packages[code] != 'undefined')
        {
            this.name              = this.latest.packages[code].name
            this.after             = this.latest.packages[code].after
            this.versions          = this.latest.packages[code].versions
            this.website           = this.latest.packages[code].website
            this.provider          = this.latest.packages[code].provider
            this.categories        = this.latest.packages[code].categories
            this.executable        = this.latest.packages[code].executable
            if (typeof version != 'undefined')
                this.version = version
            else
                this.version = this.latest.packages[code].version

            if (typeof toWhere != 'undefined')
                this.installation_path = (toWhere + '\\' + code)
            else
                this.installation_path = (process.env.PROGRAMS + '\\' + code)

        }
    }
    else
    {
        if (typeof this.installed.packages[code] != 'undefined')
        {
            this.name              = this.installed.packages[code].name
            this.after             = this.installed.packages[code].after
            this.provider          = this.installed.packages[code].provider
            this.website           = this.installed.packages[code].website
            this.executable        = this.installed.packages[code].executable
            this.categories        = this.installed.packages[code].categories
            this.installation_path = this.installed.packages[code].installation_path
            if (typeof version != 'undefined')
                this.version = version
            else
                this.version = this.latest.packages[code].version
        }
    }

    this.isInstalled = function ()
    {
        if (typeof this.installed.packages[code] != 'undefined')
            return true
        else
            return false
    }

    this.isExists = function ()
    {
        if (typeof this.latest.packages[code] != 'undefined')
            return true
        else
            return false
    }

    this.compare = function (file, hash)
    {
        var hashed = md5File.sync(file)

        if (hashed == hash)
            return true
        else
            return false
    }

    this.downloadAndInstall = function (callback)
    {
        var url       = this.versions[this.version].download
        var hash      = this.versions[this.version].hash
        var temporary = (process.env.TEMP + '\\' + this.name + '-' + this.version + '.zip')
        var file      = fs.createWriteStream(temporary)

        var req = request.get(url)
        req.on('response', function (response) {
            callback('CONNECTIONESTABILISHED', [response.statusCode])
            callback('DOWNLOADING', [this.name])

            var len = parseInt(response.headers['content-length'], 10)

            var bar = new ProgressBar('[-------------:--:--.----] Downloaded [:bar] :percent :etas', {
                complete: '#',
                incomplete: '-',
                width: '60',
                total: len
            })

            response.on('data', function (data) {
                try {
                    bar.tick(data.length)
                } catch (err) {
                    callback('CONNECTIONERROR', [err])
                    process.exit(1)
                }
            }.bind(this))
        }.bind(this))
        req.on('error', function (err) {
            callback('CONNECTIONERROR', [err.code])
        })
        req.on('end', function () {
            callback('DOWNLOADED', [this.name])

            if ( ! this.compare(temporary, hash)) // Compare file and hash
            {
                callback('BROKENARCHIVE')
                process.exit(1)
            }

            // Unzip Begin
            callback('BEGINEXTRACT')
            if ( ! fs.existsSync(this.installation_path) )
                fs.mkdirSync(this.installation_path)

            var read  = fs.createReadStream(temporary)
            var write = fstream.Writer(this.installation_path)

            read.pipe(unzip.Parse()).pipe(write)
            callback('SUCCESSEXTRACT')
            // Unzip End | Register Begin
            callback('REGISTERBEGIN')
            this.installed.packages[code] = this.latest.packages[code]
            this.installed.packages[code]['version'] = this.version
            this.installed.packages[code]['installation_path'] = this.installation_path
            delete this.installed.packages[code]['versions']
            // console.log(this.installed)
            jsonFile.writeFileSync(process.env.PROGRAMS + '\\installed.json', this.installed)
            // Register End | After Installation Begin
            callback('AFTERTASKSRUN')
            this.doAfter(function (mes) {
                callback(mes)
            })
            callback('SUCCESSEXTRACT')
        }.bind(this)).pipe(file)
    }

    this.doAfter = function (callback)
    {
        let registry = this.after.registry
        let shortcuts = this.after.shortcuts

        // Check is registry task exists
        if (Object.keys(registry).length > 0)
            // Each registry tasks
            Object.keys(registry).forEach(function (key, index) {
                if (typeof registry[key].title != 'undefined')
                {
                    let tmpRegFile = process.env.TEMP + this.name + '.reg'
                    fs.createWriteStream(tmpRegFile)
                    fs.writeFileSync(tmpRegFile, registry[key].command)
                    exec('reg import "' + tmpRegFile + '"', function (res) {
                        callback('REGISTRY', [String(res)])
                    })
                }
            }.bind(this))
        // Registry Done | Check is shortcuts task exists
        if (Object.keys(shortcuts).length > 0)
            // Each shortcut tasks
            Object.keys(shortcuts).forEach(function (key, index) {
                // Building @realpath
                let dir = process.env.USERPROFILE + '\\' + shortcuts[key].directory
                // Create @realpath if not exists
                if (typeof shortcuts[key].directory != 'undefined')
                    if ( ! fs.existsSync(dir))
                        fs.mkdirSync(dir)
                // Directories Done | Check if shortcts exists
                if (Object.keys(shortcuts[key]['shortcuts']).length > 0)
                    // Each shortcuts of @realpath
                    Object.keys(shortcuts[key]['shortcuts']).forEach(function (skey, index) {
                        // Find installation_path\executable_file
                        let src = (this.installation_path + shortcuts[key]['shortcuts'][skey].source)
                        // Find @realpath\target_source_file
                        let dst = (process.env.USERPROFILE + '\\' + shortcuts[key].directory + '\\' + shortcuts[key]['shortcuts'][skey].name)
                        // Link them
                        fs.symlink(src, dst, function (res) {
                            // Check Administration error
                            if (res && res['code'] == 'EPERM')
                                callback('ADMINREQUIRED')
                        })
                    }.bind(this))
                // Directory Shortcuts Done
            }.bind(this))
        // Shortcuts Done
    }

    this.remove = function (callback)
    {
        if (fs.existsSync(this.installation_path))
            exec('rmdir /s /q "' + this.installation_path + '"', function () {
                callback('LOCALREMOVED')

                delete this.installed.packages[code]
                jsonFile.writeFile(process.env.PROGRAMS + '\\installed.json', this.installed, function (err) {
                    if (err)
                        callback(err)
                    else
                        callback('REGISTRYREMOVE')
                }.bind(this))

            }.bind(this))
        else
            callback('LOCALFILESMISSING')
    }

    this.run = function (callback)
    {
        var executable = ('"' + String(this.installation_path + this.executable).replace('/', '\\') + '"')
        callback('RUNNING', [this.name])
        exec(executable, function () {
            callback('TERMINATED', [this.name])
        }.bind(this))
    }
}

module.exports = package
