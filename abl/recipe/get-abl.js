const path = require("path");
const Ajv = require("ajv");
const RecipeDao = require("../../dao/recipe-dao")
const dao = new RecipeDao(path.join(__dirname, "..", "..", "storage", "recipe.json"))

function GetAbl(req, res) {
    try {
        const recipe = dao.get(req.query.id);
        if (!recipe) {
            res.status(400).send({
                errorMessage: "recipe does not exist",
                params: req.query
            })
        }
        res.json(recipe);
    } catch (e) {
        console.error(e);
        res.status(500).send(e)
    }

}

module.exports = GetAbl;