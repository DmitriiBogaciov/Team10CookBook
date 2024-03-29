"use strict";
const fs = require("fs");
const crypto = require("crypto");

class CategoryDao {
    constructor(storagePath) {
        this.categoryStoragePath = storagePath;
    }

    create(category) {
        let categoryList = this._listAll();
        category.id = crypto.randomBytes(8).toString("hex");
        categoryList.push(category);
        try {
            fs.writeFileSync(this._getStorageLocation(), JSON.stringify(categoryList));
        } catch(e) {
            throw new Error("Unable to write to storage. " + this._getStorageLocation())
        }
        return category;
    }

    get(id) {
        let categoryList = this._listAll();
        return categoryList.find(item => item.id === id);
    }

    list() {
        return this._listAll();
    }

    _listAll() {
        let categoryList;
        try {
            categoryList = JSON.parse(fs.readFileSync(this._getStorageLocation()));
        } catch(e) {
            if (e.code === "ENOENT") {
                categoryList = [];
            } else {
                throw new Error("Unable to read from storage. " + this._getStorageLocation())
            }
        }
        return categoryList;
    }

    _getStorageLocation() {
        return this.categoryStoragePath;
    }

    delete(categoryId) {
        let categoryList = this._listAll();
        const index = categoryList.findIndex(item => item.id === categoryId);
        if (index === -1) {
            throw new Error(`Category with ID ${categoryId} does not exist`);
        }
        categoryList.splice(index, 1);
        try {
            fs.writeFileSync(this._getStorageLocation(), JSON.stringify(categoryList));
        } catch(e) {
            throw new Error("Unable to write to storage. " + this._getStorageLocation())
        }
    }
}

module.exports = CategoryDao;