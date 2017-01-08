const fs = require('fs');
const http = require('http');

var updateRepositories = function()
{
	var url = "http://projects.app/packager/server/packages/packages.json";
	var file = fs.createWriteStream("./latest.json");
	var request = http.get(url, function(response) {
		response.pipe(file);
		console.log("\nBaşarılı: ".green, "Depo Güncellendi");
	});
}

module.exports = updateRepositories;
