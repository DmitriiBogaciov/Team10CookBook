"use strict";
const fs = require("fs");
const path = require("path");
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

    _getStorageLocation(){
        return this.ratingStoragePath;
    }
}

module.exports = RatingDao;