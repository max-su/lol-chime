var assert = require("assert");
var process = require("process");

var leagueLib = require("../leagueLib/leagueLib.js");

process.env["APIKEY"] = "746869736973616e6170696b6579";

describe("leagueLib", function() {

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
                assert.throws(function() { leagueLib.getRegionID(tests[i]); }, Error);
            }

            done();
        });
    });

    describe("#getUrl()", function() {
        var regions = ["BR", "EUNE", "EUW", "JP", "KR", "LAN", "LAS", "NA", "OCE", "TR", "RU"];
        var dummyID = "test";
        it("should handle summoner lookups", function(done) {
            for (var i = 0; i < regions.length; i++) {
                var region = regions[i];
                var expected = "https://" + region + ".api.pvp.net/api/lol/" + region + "/v1.4/summoner/by-name/" + dummyID + "?api_key=" + process.env.APIKEY;
                assert.equal(leagueLib.getUrl("summonerLookUp", region, dummyID), expected);
            }
            done();
        });

        it("should handle game lookups", function(done) {
            for (var i = 0; i < regions.length; i++) {
                var region = regions[i];
                var expected = "https://" + region + ".api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/" + leagueLib.getRegionID(region) + "/" + dummyID + "?api_key=" + process.env.APIKEY;
                assert.equal(leagueLib.getUrl("gameLookUp", region, dummyID), expected);
            }
            done();
        });

        it("should fail on invalid calls", function(done) {
            var tests = [123, undefined, {}, null, ""];
            for (var i = 0; i < tests.length; i++) {
                for (var j = 0; j < regions.length; j++) {
                    assert.throws(function() { leagueLib.getUrl(tests[i], regions[j], dummyID); }, Error);
                }
            }
            done();
        });
    });
});
