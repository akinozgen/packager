Packager Windows Package Ma.nager
=================================

Packager is a package manager app for windows built with nodejs and c#. You can manage open source software as package like GNU/Linux
Changelog and news can be watch on twitter (@winpackager)

You can check out CHANGELOG.md for changes. I'll be try announce all changes on twitter...

Actives
-------
1. Run
2. Remove
3. List
5. Install (w/ specified directory & version)
6. Where is
7. View uninstalled packages
8. List versions of specified package
9. Update repository
10. Run commands with URI strings (like packager://run/npp)
11. Searh into repository
12. Create desktop shortcut

Using
-----
>Attention: For the update and install, url string must be edited in updateRepositories.js. Server files included in /server directory...


```
  Usage: packager [options] [command]


  Commands:

    run <package_code>                            Run a package.
    update                                        Updates repository.
    install <package_code> [version] [directory]  Install specified package. (<necessary> [unnecessary])
    remove <package_code>                         Remove specified package.
    list                                          List installed packages.
    where <package_code>                          Show specified package's installation directory.
    whatsnew                                      Show installable packages.
    versions <package_code>                       Lists specified packages's versions and descriptions.
    search <string>                               Searches in repository

  Options:

    -h, --help         output usage information
    -V, --version      output the version number
    -t, --type <type>  Output Type (konsol or handler)                                
```

Will Be Add In Future
=====================
1. Active Server (PHP)
2. Make create, edit and delete registry enteries.

Demo Installing
---------------
Throw /server files to your virtual server directory or anywhere can be run as server root. Edit url string in updateRepositories.js file as your local server url. At first run may will necessary need to run as administrator for the first creation of directory and files.
