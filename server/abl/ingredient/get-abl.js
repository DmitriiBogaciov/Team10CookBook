const path = require("path");
const Ajv = require("ajv");
const IngredientDao = require("../../dao/ingredient-dao")
const dao = new IngredientDao(path.join(__dirname, "..", "..", "storage", "ingredient.json"))

function GetAbl(req, res) {
    try {
        const ingredient = dao.get(req.query.id);
        if (!ingredient) {
            res.status(400).send({
                errorMessage: "recipe does not exist",
                params: req.query
            })
        }
        res.json(ingredient);
    } catch (e) {
        console.error(e);
        res.status(500).send(e)
    }

}

module.exports = GetAbl;