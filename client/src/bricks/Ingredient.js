import React from "react";

function Ingredient(props) {
    return props.ingredientList.map((ingredient) => {
        return <li>{ingredient.name}</li>
    })
}

export default Ingredient;