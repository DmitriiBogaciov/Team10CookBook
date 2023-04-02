const express = require("express");
const CreateAbl = require("../abl/ingredient/create-abl");
const ListAbl = require("../abl/ingredient/list-abl");
const GetAbl = require("../abl/ingredient/get-abl");
const DeleteAbl = require("../abl/ingredient/delete-abl")
const UpdateAbl = require("../abl/ingredient/update-abl")

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

router.put("/update", (req, res) => {
    UpdateAbl(req, res);
})

router.delete("/delete", (req, res) => {
    DeleteAbl(req, res);
})

module.exports = router;