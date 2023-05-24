const path = require("path");
const Ajv = require("ajv");
const RatingDao = require("../../dao/rating-dao");
const dao = new RatingDao(path.join(__dirname, "..", "..", "storage", "rating.json"));

function GetRatingsByRecipeIdAbl(req, res) {
    try {
        const ratings = dao.getRatingsByRecipeId(req.query.recipeId);
        if (!ratings) {
            res.status(400).send({
                errorMessage: "ratings do not exist for the recipe",
                params: req.query
            });
        }
        res.json(ratings);
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
}

module.exports = GetRatingsByRecipeIdAbl;
