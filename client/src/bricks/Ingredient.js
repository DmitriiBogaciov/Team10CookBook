import React from "react";

function Ingredient(props) {
    return props.ingredientList.map((ingredient) => {
        return <li key={ingredient.id}>{ingredient.name}</li>
    })
}

export default Ingredient;