const path = require("path");
const CategoryDao = require("../../dao/category-dao");
const dao = new CategoryDao(path.join(__dirname, "..", "..", "storage", "category.json"));

function ListAbl(req, res) {
    try {
        const categoryList = dao.list();
        res.json(categoryList);
    } catch (e) {
        console.error(e);
        res.status(500).send(e)
    }

}

module.exports = ListAbl;