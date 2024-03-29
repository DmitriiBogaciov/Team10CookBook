const path = require("path");
const fs = require("fs");
const Ajv = require("ajv");
const { getRecipeImageSchema } = require("../../shemas/recipe-image-schemas")

async function GetAbl(query, res) {
    const ajv = new Ajv();
    const valid = ajv.validate(getRecipeImageSchema, query);

    if (!valid) {
        return res.status(400).json({error: ajv.errors});
    }

    let pathToImage = path.join(__dirname, "..", "..", "storage/recipe-image", query.code + ".png");

    try {
        await fs.promises.access(pathToImage, fs.F_OK);
    } catch (e) {
        res.status(400).json(
            {error: `Recipe with code '${query.code}' doesn't have image yet.`})
    }

    res.sendFile(pathToImage);
}


module.exports = GetAbl;