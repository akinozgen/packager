const fs = require('fs')
const jsonfile = require('jsonfile')

module.exports = function init () {
	var localPath           = process.env.LOCALAPPDATA + '\\Programs\\Packages'
	process.env['PROGRAMS'] = localPath
	process.env['TEMP']     = (process.env.PUBLIC + '\\Temp\\')

    if ( ! fs.existsSync(localPath))
        fs.mkdirSync(localPath, 0777)

    if ( ! fs.existsSync(process.env['TEMP']))
        fs.mkdirSync(process.env['TEMP'], 0777)

	var installed = function () {
		if (fs.existsSync(localPath + '\\installed.json')) {
            return jsonfile.readFileSync(localPath + '\\installed.json')
		} else {
			jsonfile.writeFileSync(localPath + '\\installed.json', {"packages": {}})
            return {"packages": {}}
        }
	}

    return installed()
}
