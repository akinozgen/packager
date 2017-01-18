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

var urlObject = new url.parse(process.argv[2])

if (urlObject.protocol == 'packager:')
{
    var code = String(urlObject.path).replace('/', '')
    var argv = [ process.argv[0], process.argv[1], urlObject.host, code ]
    process['argv'] = argv
}

program.version(pkg.version)
    .option('calistir [code]', 'İstenilen pakete ait program çalıştırılır.', run)
    .option('guncelle', 'Paket listesini günceller.', updateRepositories)// Done
    .option('kur [paket_kodu] [kurulacak_dizin] [sürüm]', 'Belirtilen paketi kurar.', installPackage)
    .option('kaldir [paket_kodu]', 'Belirtilen paketi kaldırır.', removePackages) // Done
    .option('listele', 'Kurulu paketleri gösterir.', getInstalledPackages) // Done
    .option('nerede [paket_kodu]', 'İstenilen paketin kurulum dizinini gösterir.', packageWhere)
    .option('nelervar', 'Kurulabilecek paketleri gösterir.', showPackages)
    .option('surumler [code]', 'Belirtilen paketin sürümlerini ve açıklamalarını gösterir', getVersions)
.parse(process.argv);//End Program Functions
