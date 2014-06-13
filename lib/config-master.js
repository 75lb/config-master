var a = require("array-ting"),
    o = require("object-ting"),
    path = require("path");

module.exports = getConfig;

function getConfig(){
    var configs = a.arrayify(arguments).map(function(file){
        var jsonPath, configProperty;
        try {
            if (typeof file === "object"){
                jsonPath = file.jsonPath;
                configProperty = file.configProperty;
            } else {
                jsonPath = file;
            }

            /*
            if this require fails it will throw, return null and move on.. 
            i.e. ignore bad paths.
            */
            var data = require(jsonPath);
            if (configProperty){
                return data[configProperty];
            } else {
                return data;
            }
        } catch(e){
            return null;
        }
    });
    return o.extend.apply(null, configs);
}
