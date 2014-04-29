var w = require("wodge"),
    path = require("path");

module.exports = getConfig;

function getConfig(){
    var configs = w.arrayify(arguments).map(function(file){
        try {
            var split = file.split(":");
            var data = require(path.resolve(split[0]));
            return data[split[1]] || data;
        } catch(e){
            console.error(e);
            return null;
        }
    });
    return w.extend.apply(null, configs);
}
