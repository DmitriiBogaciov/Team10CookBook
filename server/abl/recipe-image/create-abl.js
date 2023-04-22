const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

async function CreateAbl(busboy, res) {
    let imgId;
    let dtoIn = {};
    busboy.on("field", function(fieldname, val) {
        dtoIn[fieldname] = val;
    });

    busboy.on("file", async (fieldname, file, filename, encoding, mimetype) => {

        if (mimetype !== "image/png") {
            return res.status(400).json({error: `Only supported mimetype is image/png`});
        }

        imgId = crypto.randomBytes(8).toString("hex");
        let saveTo = path.join(__dirname, "..", "..", "storage/recipe-image", imgId + ".png");
        let writeStream = fs.createWriteStream(saveTo);
        file.pipe(writeStream);
    });

    busboy.on("finish", function() {
        res.json({ status: "File successfully uploaded!", imgId});
    });

    busboy.on("error", err => {
        res.json({error: err})
    });
}
module.exports = CreateAbl