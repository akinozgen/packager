const Output  = require('./output')
const Package = require('./package')
const fs      = require('fs')

var link = function (code, options)
{
    var out        = new Output(options)
    let pack       = new Package(code, 'local', undefined, undefined, options)
    let desktop    = (process.env.USERPROFILE + '\\Desktop\\')
    let executable = (String(pack.installation_path + pack.executable).replace('/', '\\'))
    let content    = '[InternetShortcut]\nIDList=\nURL=packager://run/' + code + '\nIconIndex=0\nHotKey=0\nIconFile=' + executable + '\n[InternetShortcut.A]\nIconFile='  +executable + '\n[InternetShortcut.W]\nIconFile=' + executable

    if (pack.isExists())
        if (pack.isInstalled())
            fs.writeFile(desktop + pack.name + '.url', content, function (err) {
                if (typeof err != 'null')
                    out.prepare('Link created successfully.'.green)
                else
                    out.prepare('There is an error has occured.'.red)

                out.out()
            })
        else
            out.prepare('Package is not installed.'.yellow)
    else
        out.prepare('Package not found'.red)

    out.out()
}

module.exports = link
