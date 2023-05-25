import React from "react";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";

function RecipeTableList(props) {
    return(
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Rating</th>
                </tr>
            </thead>
            <tbody>
                {props.recipeList.map((recipe) => {
                return (
                    <tr key = {recipe.id}>
                        <Link to={`/recipe/${recipe.id}`} className="text-decoration-none text-dark">
                        <td>{recipe.name}</td>
                        </Link>
                        <td>{recipe.description}</td>
                        <td>{recipe.averageRating}</td>
                    </tr>
                );
                })}
            </tbody>
        </Table>
    )
}

export default RecipeTableList;