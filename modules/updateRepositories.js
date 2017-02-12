const fs      = require('fs')
const Output  = require('./output')
const request = require('request')

var updateRepositories = function(options)
{
    var out  = new Output(options)
	var url  = "http://192.168.2.125/packages/packages.json"
	var file = fs.createWriteStream(process.env.PROGRAMS + '\\repository.json')

	var req = request.get(url)
	req.on('error', function (err) {
		out.prepare('CONNECTIONERROR', [err])
		out.out()
	})
	req.on('end', function () {
		out.prepare('LOCALUPDATED')
		out.out()
	}).pipe(file)

}

module.exports = updateRepositories
