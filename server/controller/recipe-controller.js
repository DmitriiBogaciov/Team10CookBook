const express = require("express");
const CreateAbl = require("../abl/recipe/create-abl");
const ListAbl = require("../abl/recipe/list-abl");
const GetAbl = require("../abl/recipe/get-abl");
const DeleteAbl = require("../abl/recipe/delete-abl")
const UpdateAbl = require("../abl/recipe/update-abl")
const ListByCategoryId = require("../abl/recipe/listByCategoryId-abl")

const router = express.Router();


router.get("/list", (req, res) => {
    ListAbl(req, res);
})

router.get("/listByCategoryId", (req, res) => {
    ListByCategoryId(req, res);
})

router.get("/get", (req, res) => {
    GetAbl(req, res);
})

router.post("/create", (req, res) => {
    CreateAbl(req, res);
})

router.delete("/delete", (req, res) => {
    DeleteAbl(req, res);
})

router.put("/update", (req, res) => {
    UpdateAbl(req, res);
})

module.exports = router;