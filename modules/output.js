var output = function (options)
{
    this.pattern    = ''
    this.variables  = []
    this.options    = {'timestamp':true}
    this.preDefined = {
        'PACKAGENOTFOUND'        : ('%s package not found.'.yellow),
        'NOPACKAGEFOUND'         : ('Warning: '.yellow + 'No package found.'.cyan),
        'PACKAGEFOUND'           : ('Package found. It will be install soon'.green),
        'NOVERSION'              : ('Not a version found of this package. It cant be install.'.yellow),
        'INSTALLED'              : ('This package allready installed.'.yellow),
        'NOTINSTALLED'           : ('%s package is not installed.'.yellow),
        'ADMINREQUIRED'          : ('This operation requires Administration permissions.'.red),
        'CONNECTIONERROR'        : ('Connection error. Error Code: %s'.red),
        'CONNECTIONESTABILISHED' : ('Connection estabilished. Code: %s'.green),
        'DOWNLOADING'            : ('%s downloading to temporary directory.'.cyan),
        'DOWNLOADED'             : ('%s is being downlaoded temporary directory.'.green),
        'BROKENARCHIVE'          : ('Downloaded file is wrong. Try again'.red),
        'BEGINEXTRACT'           : ('Extractation begin.'.cyan),
        'SUCCESSEXTRACT'         : ('Extractation sucessfully completed.'.green),
        'REGISTERBEGIN'          : ('Packge registering local repository.'.cyan),
        'AFTERTASKSRUN'          : ('Running after installation tasks.'.cyan),
        'INSTALLSUCCESS'         : ('Registeration complete. Package installed correctly.'.green),
        'REGISTRY'               : ('Registry: %s'.cyan),
        'LOCALREMOVED'           : ('Local files deleted.'.green),
        'REGISTRYREMOVE'         : ('Registeration removed.'.green),
        'LOCALFILESMISSING'      : ('Local files missing.'.red),
        'RUNNING'                : ('Running: %s'.green),
        'TERMINATED'             : ('Terminated: %s'.yellow),
        'INSTALLEDON'            : ('%s is installed on:'.green + ' %s'.cyan),
        'LOCALUPDATED'           : ('Local repository updated.'.green)
    }

    this.prepare = function (patt, vars, options) {
        if (typeof this.preDefined[patt] != 'undefined')
            this.pattern = this.preDefined[patt]
        else
            this.pattern = patt

        if (typeof vars == 'undefined')
            this.variables = []
        else
            this.variables = vars
        if (typeof options != 'undefined')
            Object.keys(options).forEach(function (key, val) {
                this.options[key] = options[key]
            }.bind(this))
    }

    this.out = function () {
        let out = ''
        let pattern = String(this.pattern).split('%s')
        Object.values(pattern).forEach(function (val, index) {
            if (typeof this.variables[index] == 'undefined')
                this.variables[index] = ''
            out += val + this.variables[index]
        }.bind(this))


        if (out != '')
        {
            if (this.options.timestamp == true)
                require('log-timestamp')
            console.log(out)
        }
    }
}

module.exports = output
