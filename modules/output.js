var output = function (options)
{
    this.variables = []
    this.pattern   = ''

    this.prepare = function (patt, vars) {
        this.pattern   = patt
        if (typeof vars == 'undefined')
            this.variables = []
        else
            this.variables = vars
    }

    this.out = function () {

        let out = ''
        let pattern = String(this.pattern).split('%s')
        Object.values(pattern).forEach(function (val, index) {
            if (typeof this.variables[index] == 'undefined')
                this.variables[index] = ''
            out += val + this.variables[index]
        }.bind(this))
        console.log(out)
    }
}

module.exports = output
