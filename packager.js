#!/usr/bin/env node
'use strict';
// Node Modules
const program = require('commander');
const url     = require('url');
const pkg     = require('./package.json');

// My Modules
var installed = require('./modules/init')();
const run     = require('./modules/run');
const Package = require('./modules/package');
const getVersions    = require('./modules/getVersions');
const packageWhere   = require('./modules/packageWhere');
const showPackages   = require('./modules/showPackages');
const installPackage = require('./modules/installPackage');
const removePackages = require('./modules/removePackages.js');
const updateRepositories   = require('./modules/updateRepositories');
const getInstalledPackages = require('./modules/getInstalledPackages');

if (process.argv[2])
{
    var urlObject = new url.parse(process.argv[2])

    if (urlObject.protocol == 'packager:')
    {
        var code = String(urlObject.path).replace('/', '')
        var argv = [ process.argv[0], process.argv[1], urlObject.host, code ]
        process['argv'] = argv
    }
}

// Constructing program
program.version(pkg.version)
    .option('-t, --tip <type>', 'Çıktı tipi (konsol veya handler olabilir)', /^(konsol|handler)$/i, 'konsol')
// Run command
program.command('calistir <paket_kodu>')
    .description('İstenilen pakete ait program çalıştırılır.')
    .action(run)
// Update repository command
program.command('guncelle')
    .description('Paket listesini günceller.')
    .action(updateRepositories)
// Install command
program.command('kur <paket_kodu> [sürüm] [kurulacak_dizin]')
    .description('Belirtilen paketi kurar. (<zorunlu parametre> [isteğe bağlı parametre])')
    .action(installPackage)
// Remove command
program.command('kaldir <paket_kodu>')
    .description('Belirtilen paketi kaldırır.')
    .action(removePackages)
// Show installed command
program.command('listele')
    .description('Kurulu paketleri gösterir.')
    .action(getInstalledPackages)
// Where command
program.command('nerede <paket_kodu>')
    .description('İstenilen paketin kurulum dizinini gösterir.')
    .action(packageWhere)
// Whats inside command
program.command('nelervar')
    .description('Kurulabilecek paketleri gösterir.')
    .action(showPackages)
// Get versions command
program.command('surumler <paket_kodu>')
    .description('Belirtilen paketin sürümlerini ve açıklamalarını gösterir.')
    .action(getVersions)

program.parse(process.argv)
