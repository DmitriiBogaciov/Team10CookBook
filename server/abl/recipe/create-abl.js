const path = require("path");
const Ajv = require("ajv");
const RecipeDao = require("../../dao/recipe-dao");
const dao = new RecipeDao(path.join(__dirname, "..", "..", "storage", "recipe.json"));
const IngredientDao = require("../../dao/ingredient-dao");
const ingredientDao = new IngredientDao(path.join(__dirname, "..", "..", "storage", "ingredient.json"));

const ajv = new Ajv();

const schema = {
    type: "object",
    properties: {
        name: { type: "string", minLength: 1, maxLength: 40},
        description: { type: "string", minLength: 1, maxLength: 500},
        method: { type: "string", minLength: 1, maxLength: 4000},
        categoryIdList: { type: "array", items: { type: "string", minLength: 1 }, minItems: 1 },
        imageId: {type: "string", minLength: 1},
        ingredientList: {
            type: "array",
            minItems: 1,
            items: {
                type: "object",
                properties: {
                    id: { type: "string", minLength: 1},
                    amount: { type: "number", minLength: 1, minimum: 1, maximum: 99999},
                    unit: { type: "string", minLength: 1 },
                },
                required: ["id", "amount", "unit"],
            },
        },
        averageRating: { type: "number" },
        ratingCount: { type: "number" },
    },
    required: ["name", "description", "categoryIdList", "imageId", "ingredientList", "method"],
    additionalProperties: false,
}

function CreateAbl(req, res) {
    console.log(req.body)
    try {
        const valid = ajv.validate(schema, req.body);
        if (valid) {
            let recipe = req.body;

            for(let ingredient of recipe.ingredientList) {
                const exists = ingredientDao.get(ingredient.id);

                if (!exists) {
                    res.status(400).send({
                        errorMessage: "ingredient with id " + ingredient.id + " does not exist",
                        params: req.body,
                    });
                    return;
                }
            }
            recipe.categoryIdList = Array.isArray(recipe.categoryIdList) ? recipe.categoryIdList : [recipe.categoryIdList];
            recipe = dao.create(recipe);
            res.json(recipe);
        } else {
            res.status(400).send({
                errorMessage: "validation of input data",
                params: req.body,
                reason: ajv.errors,
            })
        }

    }   catch (e) {
        console.error(e);
        res.status(500).send(e)
    }
}

module.exports = CreateAbl