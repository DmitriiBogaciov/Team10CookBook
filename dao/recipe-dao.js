"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

class RecipeDao{
    constructor(storagePath) {
        this.recipeStoragePath = storagePath;
    }

    create(recipe) {
        let recipeList = this._listAll();
        recipe.id = crypto.randomBytes(8).toString("hex");
        recipeList.push(recipe);
        return recipe;
        try {
            fs.writeFileSync(this._getStorageLocation(), JSON.stringify(recipeList));
        } catch(e) {
            throw new Error("Unable to write to storage. " + this._getStorageLocation())
        }
    }

    _getStorageLocation() {
        return this.recipeStoragePath;
    }
}

module.exports = RecipeDao;
