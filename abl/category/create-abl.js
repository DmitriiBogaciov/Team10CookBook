const path = require("path");
const Ajv = require("ajv");
const CategoryDao = require("../../dao/category-dao");
const dao = new CategoryDao(path.join(__dirname, "..", "..", "storage", "category.json"));

const ajv = new Ajv();

const schema = {
    type: "object",
    properties: {
        name: { type: "string" }
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
        let category = req.body;
        category = dao.create(category);
        res.json(category);
    } catch (e) {
        console.error(e);
        res.status(500).send(e)
    }

};

module.exports = CreateAbl;