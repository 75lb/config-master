var w = require("wodge"),
    path = require("path");

module.exports = getConfig;

function getConfig(){
    var configs = w.arrayify(arguments).map(function(file){
        try {
            var split = file.split(":");
            /* if this require fails return null and move on*/
            var data = require(path.resolve(split[0]));
            if (split.length > 1){
                return data[split[1]];
            } else {
                return data;
            }
        } catch(e){
            return null;
        }
    });
    return w.extend.apply(null, configs);
}
