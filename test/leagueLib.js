var assert = require("assert");
var process = require("process");

var dummyAPIKey = "746869736973616e6170696b6579";
process.env["APIKEY"] = dummyAPIKey;

var leagueLib = require("../leagueLib/leagueLib.js");

describe("leagueLib", function() {
    describe("#getUrl()", function() {
    });

    describe("#cleanSummonerName()", function() {
        it("should handle mixed-case", function(done) {
            assert.equal(leagueLib.cleanSummonerName("miXeDCasE"), "mixedcase");
            done();
        });

        it("should remove spaces", function(done) {
            assert.equal(leagueLib.cleanSummonerName("hi ih"), "hiih");
            done();
        });

        it("should not change already clean names", function(done) {
            assert.equal(leagueLib.cleanSummonerName("thisismyname"), "thisismyname");
            done();
        });
    });

    describe("#getRegionID()", function() {
        it("should handle the 11 regions", function(done) {
            var tests = [
            { region: "BR", expected: "BR1" },
            { region: "EUNE", expected: "EUN1" },
            { region: "EUW", expected: "EUW1" },
            { region: "JP", expected: "JP1" },
            { region: "KR", expected: "KR" },
            { region: "LAN", expected: "LA1" },
            { region: "LAS", expected: "LA2" },
            { region: "NA", expected: "NA1" },
            { region: "OCE", expected: "OC1" },
            { region: "TR", expected: "TR1" },
            { region: "RU", expected: "RU" }
            ];

            for (var i = 0; i < tests.length; i++) {
                var test = tests[i];
                assert.equal(leagueLib.getRegionID(test.region), test.expected);
            }

            done();
        });

        it("should fail on invalid data", function(done) {
            var tests = [null, 0, undefined, "abcdefg", {}];
            for (var i = 0; i < tests.length; i++) {
                assert.equal(leagueLib.getRegionID(tests[i], null));
            }

            done();
        })
    });
});
