const express = require("express");
const CreateAbl = require("../abl/rating/create-abl");
const ListAbl = require("../abl/rating/list-abl");
const GetAbl = require("../abl/rating/get-abl");
const DeleteAbl = require("../abl/rating/delete-abl")
const GetRecipeAverageRatingAbl = require("../abl/rating/getRecipeAverageRating-abl")

const router = express.Router();


router.get("/list", (req, res) => {
    ListAbl(req, res);
})

router.get("/get", (req, res) => {
    GetAbl(req, res);
})

router.get("/getRecipeAverageRating", (req, res) => {
    GetRecipeAverageRatingAbl(req, res);
})

router.post("/create", (req, res) => {
    CreateAbl(req, res);
})

router.delete("/delete", (req, res) => {
    DeleteAbl(req, res);
})

module.exports = router;