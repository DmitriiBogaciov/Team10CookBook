const path = require("path");
const Ajv = require("ajv");
const RatingDao = require("../../dao/rating-dao");
const dao = new RatingDao(path.join(__dirname, "..", "..", "storage", "rating.json"));

const ajv = new Ajv;

const schema = {
    type: "object",
    properties: {
        recipeId: {type: "string"},
        vault: {type: "string"}
    },
    required: ["name"],
    additionalProperties: false,
}

function DeleteAbl(req, res) {
    try{
        const valid = ajv.validate(schema, req.body);
        if(!valid) {
            res.status(400).send({
                errorMessage: "validation of input data",
                params: req.body,
                reason: ajv.errors,
            })
        }
        let rating = req.body;
        rating = dao.create(rating);
        res.json(rating)
    }   catch (e) {
        console.error(e);
        res.status(500).send(e)
    }
}

module.exports = DeleteAbl;