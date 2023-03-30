const path = require("path");
const Ajv = require("ajv");
const IngredientDao = require("../../dao/ingredient-dao")
const dao = new IngredientDao(path.join(__dirname, "..", "..", "storage", "ingredient.json"))

const ajv = new Ajv();

const schema = {
    type: "object",
    properties: {
        name: { type: "string"}
    },
    required: ["name"],
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
        recipe = dao.create(recipe);
        res.json(recipe);
    }   catch (e) {
        console.error(e);
        res.status(500).send(e)
    }
}

module.exports = CreateAbl