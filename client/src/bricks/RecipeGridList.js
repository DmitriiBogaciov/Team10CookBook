import React from "react"
import Card from "react-bootstrap/Card";
import "../css/recipeGridList.css"
import {Link} from "react-router-dom";

function RecipeGridList(props) {

    return (
        <div className="row">
            {props.recipeList.map((recipe) => {
                return (
                    <div
                        key={recipe.id}
                        className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                    >
                        <Card>
                            <Link to={`/recipe/${recipe.id}`} className="text-decoration-none text-dark">
                            <Card.Img
                                variant="top"
                                className="recipe-card-img"
                                style={{
                                    backgroundImage: `url(http://localhost:8000/storage/recipe-image/${recipe.imageId}.png)`,
                                }}
                            />
                            <Card.Title style={{ marginLeft: "10px", marginTop: '10px' }}>
                                {recipe.name}
                            </Card.Title>
                            <Card.Body>
                                <div className="description-truncate description-container">
                                    {recipe.description}
                                </div>
                                <div>Rating: {recipe.averageRating}</div>
                            </Card.Body>
                            </Link>
                        </Card>
                    </div>
                );
            })}
        </div>
    );
}

export default RecipeGridList;