const path = require("path");
const Ajv = require("ajv");
const IngredientDao = require("../../dao/ingredient-dao");
const dao = new IngredientDao(path.join(__dirname, "..", "..", "storage", "ingredient.json"))

const ajv = new Ajv();

const schema = {
    type: "object",
    properties: {
        id: { type: "string"},
        name: { type: "string"}
    },
    required: ["id", "name"],
    additionalProperties: false,

}

function UpdateAbl(req, res) {
    try {
        const valid = ajv.validate(schema, req.body);
        if (valid) {
            let ingredient = req.body;
            ingredient = dao.update(ingredient);
            res.json(ingredient);

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

module.exports = UpdateAbl;