import React from "react"
import Recipe from "./Recipe"

function RecipeGridList(props) {
    return props.recipeList.map((recipe) => {
        return <Recipe recipe = {recipe} />
    });
}

export default RecipeGridList;