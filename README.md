config-master
=============
Merges together JSON data from the specified files, in the specified order. Design for app config management. 

example
-------
    var storedConfig = loadConfig("~/.global-defaults.json", "project-specific-defaults.json", "package.json:config");
