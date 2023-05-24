const path = require("path");
const Ajv = require("ajv");
const RatingDao = require("../../dao/rating-dao");
const dao = new RatingDao(path.join(__dirname, "..", "..", "storage", "rating.json"));
const RecipeDao = require("../../dao/recipe-dao");
const daoRecipe = new RecipeDao(path.join(__dirname, "..", "..", "storage", "recipe.json"));

const ajv = new Ajv;

const schema = {
    type: "object",
    properties: {
        recipeId: { type: "string" },
        value: { type: "number", minimum: 1, maximum: 5 }
    },
    required: ["recipeId", "value"],
    additionalProperties: false
};


async function CreateAbl(req, res) {
    try{
        const valid = ajv.validate(schema, req.body);
        if(!valid) {
            res.status(400).send({
                errorMessage: "validation of input data",
                params: req.body,
                reason: ajv.errors,
            })
        }
        await dao.create(req.body);

        // Обновляем данные о средней оценке и количестве оценок рецепта
        const ratings = await dao.getRatingsByRecipeId(req.body.recipeId);

        const ratingCount = ratings.length;
        const ratingSum = ratings.reduce((sum, rating) => sum + rating.value, 0);
        const averageRating = ratingSum / ratingCount;

        const recipe = await daoRecipe.get(req.body.recipeId);
        recipe.ratingValue = averageRating;
        recipe.ratingCount = ratingCount;

        await daoRecipe.update(recipe);
    }   catch (e) {
        console.error(e);
        res.status(500).send(e)
    }
}

// function CreateAbl(req, res) {
//     try{
//         const valid = ajv.validate(schema, req.body);
//         if(!valid) {
//             res.status(400).send({
//                 errorMessage: "validation of input data",
//                 params: req.body,
//                 reason: ajv.errors,
//             })
//         }
//         let rating = req.body;
//         rating = dao.create(rating);
//         res.json(rating)
//     }   catch (e) {
//         console.error(e);
//         res.status(500).send(e)
//     }
// }

module.exports = CreateAbl