const Package = require('./package');

var installPackage = function (code) {
    console.log('\r');

    var version     = typeof process.argv[5] != 'undefined' ? process.argv[5] : undefined
    var destination = typeof process.argv[4] != 'undefined' ? process.argv[4] : undefined

    var pack = new Package(code, 'repo', destination)

    if ( ! pack.isExists())
    {
        console.log('Hata: '.red, 'Böyle bir paket bulunamadı.')
        process.exit(1)
    }

    if (pack.isInstalled())
    {
        console.log('Uyarı: '.yellow, 'Bu paket zaten kurulmuş.')
        process.exit(1)
    }

    pack.downloadAndInstall(function (title, mes) {
        console.log(title, mes)
        if (title == 'done')
            process.exit(1)
    })

    // console.log('bunu okuyorsan herşey yolunda demektir');
};

module.exports = installPackage;
