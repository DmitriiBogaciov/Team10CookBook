import React from "react"

function Recipe(props) {
    return (
        <div key={props.recipe.id}>
            <div>{props.recipe.name}</div>
            <div>{props.recipe.description}</div>
        </div>
    )
}

export default Recipe;