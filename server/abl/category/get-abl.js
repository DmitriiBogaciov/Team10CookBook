const path = require("path");
const CategoryDao = require("../../dao/category-dao");
const dao = new CategoryDao(path.join(__dirname, "..", "..", "storage", "category.json"));

function GetAbl(req, res) {
    try {
        const category = dao.get(req.query.id);
        if (!category) {
            res.status(400).send({
                errorMessage: "category does not exist",
                params: req.query
            })
        }
        res.json(category);
    } catch (e) {
        console.error(e);
        res.status(500).send(e)
    }

}

module.exports = GetAbl;