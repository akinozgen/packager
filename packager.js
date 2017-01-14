#!/usr/bin/env node
'use strict';
// Node Modules
const program = require('commander');
const pkg = require('./package.json');

// My Modules
const updateRepositories = require('./modules/updateRepositories');
const packageWhere = require('./modules/packageWhere');
const installPackage = require('./modules/installPackage');
const getInstalledPackages = require('./modules/getInstalledPackages');
const removePackages = require('./modules/removePackages.js');
var installed = require('./modules/init')();

program.version(pkg.version)
    .option('guncelle', 'Paket Listesini Günceller.', updateRepositories)// Done
    .option('kur [paket_kodu] [kurulacak_dizin] [sürüm]', 'Belirtilen Paketi Kurar.', installPackage.batch)
    .option('kaldir [paket_kodu]', 'Belirtilen Paketi Kaldırır.', removePackages.remove) // Done
    .option('listele', 'Kurulu Paketleri Gösterir.', getInstalledPackages) // Done
    .option('nerede [paket_kodu]', 'İstenilen Paketin Kurulum Dizinini Gösterir.', packageWhere)
    .parse(process.argv);//End Program Functions
