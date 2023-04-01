const path = require("path");
const Ajv = require("ajv");
const RatingDao = require("../../dao/rating-dao");
const dao = new RatingDao(path.join(__dirname, "..", "..", "storage", "rating.json"));

function ListAbl(req, res) {
    try {
        const ratingList = dao.list();
        res.json(ratingList);
    } catch (e) {
        console.error(e);
        res.status(500).send(e)
    }

}

module.exports = ListAbl;