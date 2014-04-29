var test = require("tape"),
    config = require("../lib/load-config.js");

test("main", function(t){
    var c = config("test/config1.json", "test/config2.json", "package.json:config");
    t.deepEqual(c, {
        one: "einen",
        two: "zwei",
        three: 3,
        four: "package"
    });
    t.end();
});
