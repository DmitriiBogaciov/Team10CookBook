const express = require("express");
const categoryRouter = require("./controller/category-controller");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res)=> {
    res.send("Hello World");
})

app.use("/category", categoryRouter);

app.all("/*", (req, res)=> {
    res.status(400).send("Unknown path");
})

app.listen(port, ()=> {
    console.log(`CookBook app server is listening at http://localhost:${port}`);
})