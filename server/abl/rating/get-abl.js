const path = require("path");
const Ajv = require("ajv");
const RatingDao = require("../../dao/rating-dao");
const dao = new RatingDao(path.join(__dirname, "..", "..", "storage", "rating.json"));

function GetAbl(req, res) {
    try {
        const rating = dao.get(req.query.id);
        if (!rating) {
            res.status(400).send({
                errorMessage: "recipe does not exist",
                params: req.query
            })
        }
        res.json(rating);
    } catch (e) {
        console.error(e);
        res.status(500).send(e)
    }

}

module.exports = GetAbl;