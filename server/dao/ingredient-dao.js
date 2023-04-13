"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

class IngredientDao {
    constructor(storagePath) {
        this.ingredientStoragePath = storagePath;
    }

    create(ingredient) {
        let ingredientList = this._listAll();
        ingredient.id = crypto.randomBytes(8).toString("hex");
        ingredientList.push(ingredient);
        try {
            fs.writeFileSync(this._getStorageLocation(), JSON.stringify(ingredientList));
        } catch(e) {
            throw new Error("Unable to write to storage. " + this._getStorageLocation())
        }
        return ingredient;
    }

    get(id) {
        let ingredientList = this._listAll();
        return ingredientList.find(item => item.id === id);
    }

    list() {
        return this._listAll();
    }

    _listAll() {
        let ingredientList;
        try {
            ingredientList = JSON.parse(fs.readFileSync(this._getStorageLocation()));
        } catch(e) {
            if (e.code === "ENOENT") {
                ingredientList = [];
            } else {
                throw new Error("Unable to read from storage. " + this._getStorageLocation())
            }
        }
        return ingredientList;
    }

    _getStorageLocation() {
        return this.ingredientStoragePath;
    }

    update(ingredient){
        let ingredientList = this._listAll();
        const index = ingredientList.findIndex(item => item.id === ingredient.id);
        if (index === -1) {
            throw new Error(`Ingredient with ID ${ingredient.id} does not exist`);
        }
        ingredientList[index] = Object.assign({}, ingredientList[index], ingredient);
        try {
            fs.writeFileSync(this._getStorageLocation(), JSON.stringify(ingredientList));
        } catch(e) {
            throw new Error("Unable to write to storage. " + this._getStorageLocation())
        }
        return ingredientList[index];

    }

    delete(ingredientId) {
        let ingredientList = this._listAll();
        const index = ingredientList.findIndex(item => item.id === ingredientId);
        if (index === -1) {
            throw new Error(`Ingredient with ID ${ingredientId} does not exist`);
        }
        ingredientList.splice(index, 1);
        try {
            fs.writeFileSync(this._getStorageLocation(), JSON.stringify(ingredientList));
        } catch(e) {
            throw new Error("Unable to write to storage. " + this._getStorageLocation())
        }
    }
}
module.exports = IngredientDao;