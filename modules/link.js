const Package = require('./package')
const fs = require('fs')

var link = function (code, options)
{
    require('log-timestamp')

    let pack       = new Package(code, 'local', undefined, undefined, options)
    let desktop    = (process.env.USERPROFILE + '\\Desktop\\')
    let executable = ('"' + String(pack.installation_path + pack.executable).replace('/', '\\') + '"')
    let content    = '[InternetShortcut]\nIDList=\nURL=packager://run/' + code + '\nIconIndex=0\nHotKey=0\nIconFile=' + executable

    if (pack.isExists())
        if (pack.isInstalled())
            fs.writeFile(desktop + pack.name + '.url', content, function (err) {
                if (typeof err != 'null')
                    console.log('Link created successfully.'.green)
                else
                    console.log('There is an error has occured.'.red)
            })
        else
            console.log('Package is not installed.'.yellow)
    else
        console.log('Package not found'.red)
}

module.exports = link
