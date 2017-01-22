const fs = require('fs');
const http = require('http');

var updateRepositories = function(options)
{
	var url = "http://projects.app/packager/server/packages/packages.json";
	var file = fs.createWriteStream(__dirname + "/../latest.json");

	http.get({ host: 'projects.app', port: 80 }, function (res) {
		if (res.statusCode == 200)
		{
			var request = http.get(url, function(response) {
				response.pipe(file);
				console.log("\nBaşarılı: ".green, "Depo Güncellendi");
			});
		}
		else
		{
			console.log('Hata: '.red, 'Sunucuya bağlanılamadı. İnternet bağlantınızı doğrulayıp tekrar deneyin.');
		}
	});

}

module.exports = updateRepositories;
