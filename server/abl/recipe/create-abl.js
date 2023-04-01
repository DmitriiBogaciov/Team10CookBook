const path = require("path");
const Ajv = require("ajv");
const RecipeDao = require("../../dao/recipe-dao")
const dao = new RecipeDao(path.join(__dirname, "..", "..", "storage", "recipe.json"))

const ajv = new Ajv();

const schema = {
    type: "object",
    properties: {
        name: { type: "string"},
        description: { type: "string"},
        categoryIdList: { type: "array", items: { type: "string" } },
        imageId: {type: "string"},
        ingredientIdList: { type: "array", items: { type: "string" } }
    },
    required: ["name", "description", "categoryIdList", "imageId", "ingredientIdList"],
    additionalProperties: false,
}

function CreateAbl(req, res) {
    try {
        const valid = ajv.validate(schema, req.body);
        if (!valid) {
            res.status(400).send({
                errorMessage: "validation of input data",
                params: req.body,
                reason: ajv.errors,
            })
        }
        let recipe = req.body;
        recipe.categoryIdList = Array.isArray(recipe.categoryIdList) ? recipe.categoryIdList : [recipe.categoryIdList];
        recipe = dao.create(recipe);
        res.json(recipe);
    }   catch (e) {
        console.error(e);
        res.status(500).send(e)
    }
}

module.exports = CreateAbl