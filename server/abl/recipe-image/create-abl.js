const path = require("path");
const fs = require("fs");
const Ajv = require("ajv");
const RecipeDao = require("../../dao/recipe-dao")
const dao = new RecipeDao(path.join(__dirname, "..", "..", "storage", "recipe.json"))
const { createRecipeImageSchema } = require("../../shemas/recipe-image-schemas");

async function CreateAbl(busboy, res) {
    let dtoIn = {};
    busboy.on("field", function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        dtoIn[fieldname] = val;
    });

    busboy.on("file", async (fieldname, file, filename, encoding, mimetype) => {
        const ajv = new Ajv();
        const valid = ajv.validate(createRecipeImageSchema, dtoIn);

        if (!valid) {
            return res.status(400).json({error: ajv.errors});
        }

        const recipe = await dao.get(dtoIn.code);
        if (!recipe) {
            return res.status(400).json({error: `Recipe with code '${dtoIn.code}' doesn't exist.`});
        }

        if (mimetype !== "image/png") {
            return res.status(400).json({error: `Only supported mimetype is image/png`});
        }

        let saveTo = path.join(__dirname, "..", "..", "storage/recipe-image", dtoIn.code + ".png");
        let writeStream = fs.createWriteStream(saveTo);
        file.pipe(writeStream);
    });

    busboy.on("finish", function() {
        res.json({ status: "File successfully uploaded!" });
    });

    busboy.on("error", err => {
        res.json({error: err})
    });
}
module.exports = CreateAbl