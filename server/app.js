const express = require("express");
const categoryRouter = require("./controller/category-controller");
const recipeRouter = require("./controller/recipe-controller");
const ingredientRouter = require("./controller/ingredient-controller");
const recipeImageRouter = require("./controller/recipe-image-controller")
const Busboy = require("busboy");
const path = require("path");
const fs = require("fs")

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res)=> {
    res.send("Hello World");
})

//configuration for Busboy
app.post("/file/store", (req, res) => {
    let busboy = new Busboy({headers: req.headers, limits: {files: 1}});

    busboy.on("file", function(fieldname, file, filename, encoding, mimetype) {
        let saveTo = path.join(__dirname, "storage", filename);
        let writeStream = fs.createWriteStream(saveTo);
        file.pipe(writeStream);
    });
    busboy.on("finish", function() {
        res.json({ status: "File successfully uploaded!" });
    });
    busboy.on("error", err => {
        res.json({error: err})
    });
    req.pipe(busboy);
});
//Busboy end

app.use("/category", categoryRouter);
app.use("/recipe", recipeRouter)
app.use("/ingredient", ingredientRouter)
app.use("/recipeImage", recipeImageRouter)

app.all("/*", (req, res)=> {
    res.status(400).send("Unknown path");
})

app.listen(port, ()=> {
    console.log(`CookBook app server is listening at http://localhost:${port}`);
})