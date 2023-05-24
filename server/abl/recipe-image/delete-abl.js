const path = require("path");
const fs = require("fs");

function DeleteImage(imageId) {
    const imagePath = path.join(__dirname, "..", "..", "storage", "recipe-image", `${imageId}.png`);

    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Image ${imageId}.png deleted successfully.`);
        }
    });
}

module.exports = DeleteImage;
