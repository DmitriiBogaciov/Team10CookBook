const path = require("path");
const Ajv = require("ajv");
const CategoryDao = require("../../dao/category-dao");
const dao = new CategoryDao(path.join(__dirname, "..", "..", "storage", "category.json"));

const ajv = new Ajv();

const schema = {
    type: "object",
    properties: {
        id: { type: "string" }
    },
    required: ["id"],
    additionalProperties: false,
}

function DeleteAbl(req, res) {
    try {
        const valid = ajv.validate(schema, req.body);
        if (!valid) {
            res.status(400).send({
                errorMessage: "validation of input data",
                params: req.body,
                reason: ajv.errors,
            })
        }
        const categoryId = req.body.id;
        dao.delete(categoryId);
        res.json({
            message: `Category with id ${categoryId} deleted successfully.`
        });
    } catch (e) {
        console.error(e);
        res.status(500).send(e)
    }
}

module.exports = DeleteAbl;
