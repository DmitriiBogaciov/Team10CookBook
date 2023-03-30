const express = require("express");
const CreateAbl = require("../abl/category/create-abl");
const ListAbl = require("../abl/category/list-abl");
const GetAbl = require("../abl/category/get-abl");
const DeleteAbl = require("../abl/category/delete-abl")

const router = express.Router();


router.get("/list", (req, res) => {
    ListAbl(req, res);
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

module.exports = router;