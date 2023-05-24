const path = require("path");
const Ajv = require("ajv");
const RecipeDao = require("../../dao/recipe-dao")
const dao = new RecipeDao(path.join(__dirname, "..", "..", "storage", "recipe.json"))
const DeleteImage = require("../recipe-image/delete-abl");


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
        const recipeId = req.body.id;
        dao.delete(recipeId);

        // Удаление картинки
        const imageId = req.body.imageId;
        DeleteImage(imageId);

        res.json({
            message: `Recipe with id ${recipeId} deleted successfully.`
        });
    } catch (e) {
        console.error(e);
        res.status(500).send(e)
    }
}

module.exports = DeleteAbl;
