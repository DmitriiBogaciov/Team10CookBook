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
        recipe.categoryIdList = Array.isArray(recipe.categoryIdList) ? recipe.categoryIdList : [recipe.categoryIdList];
        recipeList.push(recipe);
        try {
            fs.writeFileSync(this._getStorageLocation(), JSON.stringify(recipeList));
        } catch(e) {
            throw new Error("Unable to write to storage. " + this._getStorageLocation())
        }
        return recipe;
    }

    get(id) {
        let recipeList = this._listAll();
        return recipeList.find(item => item.id === id);
    }

    _getStorageLocation() {
        return this.recipeStoragePath;
    }

    list() {
        return this._listAll()
    }

    _listAll(){
        let recipeList;
        try {
            recipeList = JSON.parse(fs.readFileSync(this._getStorageLocation()));
        } catch(e) {
            if (e.code === "ENOENT") {
                recipeList = [];
            } else {
                throw new Error("Unable to read from storage. " + this._getStorageLocation())
            }
        }
        return recipeList;
    }
    delete(recipeId) {
        let recipeList = this._listAll();
        const index = recipeList.findIndex(item => item.id === recipeId);
        if (index === -1) {
            throw new Error(`Recipe with ID ${recipeId} does not exist`);
        }
        recipeList.splice(index, 1);
        try {
            fs.writeFileSync(this._getStorageLocation(), JSON.stringify(recipeList));
        } catch(e) {
            throw new Error("Unable to write to storage. " + this._getStorageLocation())
        }
    }
    update(recipe) {
        const recipeList = this._listAll();
        const index = recipeList.findIndex(item => item.id === recipe.id);
        if (index === -1) {
            throw new Error(`Recipe with ID ${recipe.id} does not exist`);
        }
        recipeList[index] = Object.assign({}, recipeList[index], recipe);
        try {
            fs.writeFileSync(this._getStorageLocation(), JSON.stringify(recipeList));
        } catch(e) {
            throw new Error("Unable to write to storage. " + this._getStorageLocation())
        }
        return recipeList[index];
    }
    findByCategoryId(categoryId) {
        let recipeList = this._listAll();
        return recipeList.filter(item => {
            if (Array.isArray(item.categoryIdList)) {
                return item.categoryIdList.includes(categoryId);
            } else {
                return item.categoryIdList === categoryId;
            }
        });
    }
}

module.exports = RecipeDao;
