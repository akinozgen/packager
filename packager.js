#!/usr/bin/env node
'use strict'
// Node Modules
const program = require('commander')
const url     = require('url')
const pkg     = require('./package.json')

// My Modules
const installed = require('./modules/init')()
const Output    = require('./modules/output')
const run       = require('./modules/run')
const link      = require('./modules/link')
const search    = require('./modules/search')
const Package   = require('./modules/package')
const getVersions    = require('./modules/getVersions')
const packageWhere   = require('./modules/packageWhere')
const showPackages   = require('./modules/showPackages')
const installPackage = require('./modules/installPackage')
const removePackages = require('./modules/removePackages.js')
const updateRepositories   = require('./modules/updateRepositories')
const getInstalledPackages = require('./modules/getInstalledPackages')

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
    .option('-t, --type <type>', 'Output Type (konsol or handler)', /^(konsol|handler)$/i, 'konsol')
    .option('-c --category <category>', 'Select category for listing.', '')
// Run command
program.command('run <package_code>')
    .description('Run a package.')
    .action(run)
// Update repository command
program.command('update')
    .description('Updates repository.')
    .action(updateRepositories)
// Install command
program.command('install <package_code> [version] [directory]')
    .description('Install specified package. (<necessary> [unnecessary])')
    .action(installPackage)
// Remove command
program.command('remove <package_code>')
    .description('Remove specified package.')
    .action(removePackages)
// Show installed command
program.command('list')
    .description('List installed packages.')
    .action(getInstalledPackages)
// Where command
program.command('where <package_code>')
    .description('Show specified package\'s installation directory.')
    .action(packageWhere)
// Whats inside command
program.command('get')
    .description('Show installable packages.')
    .action(showPackages)
// Get versions command
program.command('versions <package_code>')
    .description('Lists specified packages\'s versions and descriptions.')
    .action(getVersions)

program.command('search <string>')
    .description('Searches in repository')
    .action(search)

program.command('link <code>')
    .description('Make shortcut to desktop')
    .action(link)

program.command('test <string>')
    .description('Test some things')
    .action(function (string, options) {

    })

program.parse(process.argv)
