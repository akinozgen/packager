const Output  = require('./output')
const Package = require('./package')
const fs      = require('fs')

var link = function (code, options)
{
    var out        = new Output(options)
    let pack       = new Package(code, 'local', undefined, undefined, options)
    let desktop    = (process.env.USERPROFILE + '\\Desktop\\' + pack.name)

    if (pack.isExists())
        if (pack.isInstalled())
            fs.symlink(pack.installation_path + pack.executable, desktop, function (res) {
                if (res && res['code'] == 'EPERM')
                    out.prepare('This operation requires Administration permissions.'.red)
                else if (res && res['code'] == 'EEXIST')
                    out.prepare('Link exists.'.yellow)

                out.out()
            })
        else
            out.prepare('Package is not installed.'.yellow)
    else
        out.prepare('Package not found'.red)

    out.out()
}

module.exports = link
