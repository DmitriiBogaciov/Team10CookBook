const path = require("path");
const RecipeDao = require("../../dao/recipe-dao")
const dao = new RecipeDao(path.join(__dirname, "..", "..", "storage", "recipe.json"))

function ListByCategoryAbl(req, res) {
    try {
        const recipeList = dao.findByCategoryId(req.query.categoryId);
        if (!recipeList) {
            res.status(400).send({
                errorMessage: "recipe does not exist",
                params: req.query
            })
        }
        res.json(recipeList);
    } catch (e) {
        console.error(e);
        res.status(500).send(e)
    }
}

module.exports = ListByCategoryAbl;