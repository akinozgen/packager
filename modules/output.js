var output = function (options)
{
    this.variables = []
    this.options   = {'timestamp':true}
    this.pattern   = ''

    this.prepare = function (patt, vars, options) {
        this.pattern   = patt
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
