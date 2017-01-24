const request = require('request')
const fs = require('fs')

var updateRepositories = function(options)
{
	var url = "http://projects.app/packager/server/packages/packages.json"
	var file = fs.createWriteStream(process.env.PROGRAMS + '\\repository.json')

	var req = request.get(url)
	req.on('error', function (err) {
		if (options.parent.type == 'konsol')
			console.log(('Connection error: ' + err).red)
		else
			console.log('CONNECTIONERROR')
	})
	req.on('end', function () {
		if (options.parent.type == 'konsol')
		{
			console.log()
			require('log-timestamp')
			console.log('Local repository updated.'.green)
		}
		else
			console.log('UPDATED')
	}).pipe(file)

}

module.exports = updateRepositories
