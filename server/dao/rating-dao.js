"use strict";
const fs = require("fs");
const crypto = require("crypto");

class RatingDao {
    constructor(storagePath) {
        this.ratingStoragePath = storagePath;
    }

    create(rating){
        let ratingList = this._listAll();
        rating.id = crypto.randomBytes(8).toString("hex");
        ratingList.push(rating);
        try{
            fs.writeFileSync(this._getStorageLocation(), JSON.stringify(ratingList));
        } catch (e){
            throw new Error("Unable to write to storage. " + this._getStorageLocation())
        }
        return rating;
    }

    list(){
        return this._listAll();
    }

    _listAll(){
        let ratingList;
        try {
            ratingList = JSON.parse(fs.readFileSync(this._getStorageLocation()));
        } catch (e){
            if (e.code !== "ENOENT") {
                ratingList = [];
            } else {
                throw new Error("Unable to read from storage. ") + this._getStorageLocation()
            }
        }
        return ratingList;
    }

    get(id) {
        let ratingList = this._listAll();
        return ratingList.find(item => item.id ===id);
    }

    _getStorageLocation(){
        return this.ratingStoragePath;
    }

    getRecipeAverageRating(recipeId) {
        let ratingList = this._listAll();
        ratingList = ratingList.filter(item => item.recipeId === recipeId);
        const ratingSum = ratingList.reduce((sum, item) => sum + item.value, 0);
        const averageRating = ratingSum / ratingList.length;
        return averageRating.toFixed(1);
    }

    getRatingsByRecipeId(recipeId) {
        const ratingList = this._listAll();
        return ratingList.filter(item => item.recipeId === recipeId);
    }
}

module.exports = RatingDao;