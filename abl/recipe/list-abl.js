const path = require("path");
const Ajv = require("ajv");
const RecipeDao = require("../../dao/recipe-dao")
const dao = new RecipeDao(path.join(__dirname, "..", "..", "storage", "recipe.json"))

function ListAbl(req, res) {
    try {
        const recipeList = dao.list();
        res.json(recipeList);
    } catch (e) {
        console.error(e);
        res.status(500).send(e)
    }

}

module.exports = ListAbl;