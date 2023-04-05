import React from "react";
import Recipe from "./Recipe";

function RecipeList(props) {
    function getRecipeList(recipeList) {
        return recipeList.map((recipe) => {
            return <Recipe recipe = {recipe}/>
        })
    }
    return getRecipeList(props.studentList)
}

export default RecipeList