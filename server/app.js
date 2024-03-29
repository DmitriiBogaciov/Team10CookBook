const express = require("express");
const categoryRouter = require("./controller/category-controller");
const recipeRouter = require("./controller/recipe-controller");
const ingredientRouter = require("./controller/ingredient-controller");
const recipeImageRouter = require("./controller/recipe-image-controller")
const ratingRouter = require("./controller/rating-controller");
const path = require('path');

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/storage/recipe-image', express.static(path.join(__dirname, 'storage/recipe-image')));
app.use('/storage/Images', express.static(path.join(__dirname, 'storage/Images')));

app.get("/", (req, res)=> {
    res.send("Hello World");
})

app.use("/category", categoryRouter);
app.use("/recipe", recipeRouter);
app.use("/ingredient", ingredientRouter);
app.use("/recipeImage", recipeImageRouter);
app.use("/rating", ratingRouter);

app.all("/*", (req, res)=> {
    res.status(400).send("Unknown path");
})

app.listen(port, ()=> {
    console.log(`CookBook app server is listening at http://localhost:${port}`);
})