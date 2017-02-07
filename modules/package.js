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
    this.latest            = jsonFile.readFileSync(process.env.PROGRAMS + '\\repository.json')
    this.installed         = jsonFile.readFileSync(process.env.PROGRAMS + '\\installed.json')

    if (fromWhere == 'remote')
    {
        if (typeof this.latest.packages[code] != 'undefined')
        {
            this.name              = this.latest.packages[code].name
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
            callback(('Conneection eastabilished. Code: ' + response.statusCode).green, 'CONNECTIONESTABILISHED')
            callback((this.name + " downloading to temporary directory.").cyan, 'DOWNLOADING')

            var len = parseInt(response.headers['content-length'], 10)

            var bar = new ProgressBar('Downlaoded [:bar] :percent :etas', {
                complete: '#',
                incomplete: '-',
                width: '60',
                total: len
            })

            response.on('data', function (data) {
                try {
                    if (options.parent.type == 'konsol')
                        bar.tick(data.length)
                } catch (err) {
                    callback(('Connection error. Error Code: ' + err).red, 'CONNECTIONERROR')
                    process.exit(1)
                }
            }.bind(this))
        }.bind(this))
        req.on('error', function (err) {
            callback(('Connection error. Error Code: ' + err.code).red, 'CONNECTIONERROR')
        })
        req.on('end', function () {
            callback((this.name + " is being downlaoded temporary directory.").green, 'DOWNLOADED')

            if ( ! this.compare(temporary, hash)) // Compare file and hash
            {
                callback('Downloaded file is wrong. Try again', 'FILEWRONG')
                process.exit(1)
            }

            // Unzip Begin
            callback('Extractation begin.'.cyan, 'EXTRACTBEGIN')
            if ( ! fs.existsSync(this.installation_path) )
                fs.mkdirSync(this.installation_path)

            var read  = fs.createReadStream(temporary)
            var write = fstream.Writer(this.installation_path)

            read.pipe(unzip.Parse()).pipe(write)
            callback('Extractation sucessfully completed.'.green, 'EXTRACTSUCCESS')
            // Unzip End | Register Begin
            callback('Packge registering local repository.'.cyan, 'REGISTERING')
            this.installed.packages[code] = this.latest.packages[code]
            this.installed.packages[code]['version'] = this.version
            this.installed.packages[code]['installation_path'] = this.installation_path
            delete this.installed.packages[code]['versions']
            // console.log(this.installed)
            jsonFile.writeFileSync(process.env.PROGRAMS + '\\installed.json', this.installed)
            // Register End
            callback('Registeration complete. Package installed correctly.'.green, 'INSTALLEDSUCCESSFULLY')
        }.bind(this)).pipe(file)
    }

    this.remove = function (callback)
    {
        if (fs.existsSync(this.installation_path))
            exec('rmdir /s /q "' + this.installation_path + '"', function () {
                callback('Local files deleted.'.green, 'LOCALDELETED')

                delete this.installed.packages[code]
                jsonFile.writeFile(process.env.PROGRAMS + '\\installed.json', this.installed, function (err) {
                    if (err)
                        callback(err)
                    else
                        callback('Registeration removed.'.green, 'REGISTERYDELETED')
                }.bind(this))

            }.bind(this))
        else
            callback('Local files missing.'.red, 'LOCALFILESMISSING')
    }

    this.run = function (callback)
    {
        var executable = ('"' + String(this.installation_path + this.executable).replace('/', '\\') + '"')
        callback(('Running: ' + this.name).green, 'RUNNING')
        exec(executable, function () {
            callback(('Terminated: ' + this.name).yellow, undefined)
        }.bind(this))
    }
}

module.exports = package
