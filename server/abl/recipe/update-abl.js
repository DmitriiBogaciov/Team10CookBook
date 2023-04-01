const path = require("path");
const Ajv = require("ajv");
const RecipeDao = require("../../dao/recipe-dao")
const dao = new RecipeDao(path.join(__dirname, "..", "..", "storage", "recipe.json"))

const ajv = new Ajv();

const schema = {
    type: "object",
    properties: {
        id: {type: "string"},
        name: { type: "string"},
        description: { type: "string"},
        categoryIdList: { type: "array", items: { type: "string" } },
        imageId: {type: "string"},
        recipeIdList: { type: "array", items: { type: "string" } }
    },
    required: ["id"],
    additionalProperties: false,
}

function UpdateAbl(req, res) {
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
        recipe = dao.update(recipe);
        res.json(recipe);
    }   catch (e) {
        console.error(e);
        res.status(500).send(e)
    }
}

module.exports = UpdateAbl