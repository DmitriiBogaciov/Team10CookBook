const express = require("express");
const categoryRouter = require("./controller/category-controller");
const recipeRouter = require("./controller/recipe-controller");
const ingredientRouter = require("./controller/ingredient-controller")

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res)=> {
    res.send("Hello World");
})

app.use("/category", categoryRouter);
app.use("/recipe", recipeRouter)
app.use("/ingredient", ingredientRouter)

app.all("/*", (req, res)=> {
    res.status(400).send("Unknown path");
})

app.listen(port, ()=> {
    console.log(`CookBook app server is listening at http://localhost:${port}`);
})