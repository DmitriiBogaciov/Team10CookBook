const path = require("path");
const Ajv = require("ajv");
const IngredientDao = require("../../dao/ingredient-dao")
const dao = new IngredientDao(path.join(__dirname, "..", "..", "storage", "ingredient.json"))

function ListAbl(req, res) {
    try {
        const ingredientList = dao.list();
        res.json(ingredientList);
    } catch (e) {
        console.error(e);
        res.status(500).send(e)
    }

}

module.exports = ListAbl;