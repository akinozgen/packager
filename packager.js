#!/usr/bin/env node
'use strict';
// Node Modules
const program = require('commander');
const pkg = require('./package.json');

// My Modules
const updateRepositories = require('./updateRepositories');
const packageWhere = require('./packageWhere');
const installPackage = require('./installPackage');
const getInstalledPackages = require('./getInstalledPackages');
const removePackages = require('./removePackages.js');
var installed = require('./init')();

program.version(pkg.version)
    .option('guncelle', 'Paket Listesini Günceller.', updateRepositories)// Done
    .option('kur [paket_kodu]', 'Belirtilen Paketi Kurar.')
    .option('kaldir [paket_kodu]', 'Belirtilen Paketi Kaldırır.', removePackages.remove) // Done
    .option('listele', 'Kurulu Paketleri Gösterir.', getInstalledPackages) // Done
    .option('nerede [paket_kodu]', 'İstenilen Paketin Kurulum Dizinini Gösterir.', packageWhere)
    .parse(process.argv);//End Program Functions
