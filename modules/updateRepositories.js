const request = require('request')
const fs = require('fs')

var updateRepositories = function(options)
{
	var url = "http://projects.app/packager/server/packages/packages.json"
	var file = fs.createWriteStream(__dirname + "/../latest.json")

	var req = request.get(url)
	req.on('error', function (err) {
		if (options.parent.tip == 'konsol')
			console.log(('Bağlantı Hatası: ' + err).red)
		else
			console.log('CONNECTIONERROR')
	})
	req.on('end', function () {
		if (options.parent.tip == 'konsol')
		{
			console.log()
			require('log-timestamp')
			console.log('Yerel Depo Güncellendi.'.green)
		}
		else
			console.log('UPDATED')
	}).pipe(file)

}

module.exports = updateRepositories
