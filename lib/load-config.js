var w = require("wodge"),
    path = require("path");

module.exports = getConfig;

function getConfig(files){
    var configs = w.arrayify(files).map(function(file){
        try {
            var split = file.split(":");
            var data = require(path.resolve(split[0]));
            return data[split[1]] || data;
        } catch(e){
            return null;
        }
    });
    return w.extend.apply(null, configs);
}
