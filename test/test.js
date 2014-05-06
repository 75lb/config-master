var test = require("tape"),
    config = require("../lib/config-master.js");

test("merges correctly", function(t){
    var c = config("test/config1.json", "test/config2.json", "test/package.json:config");
    t.deepEqual(c, {
        one: "einen",
        two: "zwei",
        three: 3,
        four: "package"
    });
    t.end();
});

test("missing package.json property", function(t){
    var c = config("test/config1.json", "test/config2.json", "test/package2.json:config");
    t.deepEqual(c, {
        "one": 1,
        "two": "zwei",
        "three": 3
    });
    t.end();
});
