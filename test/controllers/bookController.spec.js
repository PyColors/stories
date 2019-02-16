// const chai = require("chai");
// const expect = chai.expect;

const indexPage = require("../../src/controllers/bookController");

describe("getIndex", function () {
    it("should return index page function", function () {
        let req = {};
        let res = {
            send: function () {
            }
        };

        indexPage.getIndex(req, res)
    });
});
