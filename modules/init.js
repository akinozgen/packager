const fs = require('fs');
const jsonfile = require('jsonfile');

module.exports = function init () {
	var localPath = process.env.LOCALAPPDATA + '\\Programs\\Packages';

    if ( ! fs.existsSync(localPath))
        fs.mkdirSync(localPath, 0777);

	process.env['PROGRAMS'] = localPath;

	var installed = function () {
		if (fs.existsSync(localPath + '\\installed.json')) {
            return jsonfile.readFileSync(localPath + '\\installed.json');
		} else {
			jsonfile.writeFileSync(localPath + '\\installed.json', {"packages": {}});
            return {"packages": {}};
        }
	};

    return installed();
};
