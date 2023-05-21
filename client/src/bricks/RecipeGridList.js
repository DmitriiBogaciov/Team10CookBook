import React, {useState} from "react"
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import RecipeDetail from "./RecipeDetail";
import Button from "react-bootstrap/Button";
import "../css/recipeGridList.css"
import {Link} from "react-router-dom";

function RecipeGridList(props) {
    const [show, setShow] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = (recipe) => {
        setSelectedRecipe(recipe);
        setShow(true)
    }

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
                                onClick={() => handleShow(recipe)}
                            />
                            <Card.Title style={{ marginLeft: "10px" }}>
                                {recipe.name}
                            </Card.Title>
                            <Card.Body>
                                <div className="description-truncate description-container">
                                    {recipe.description}
                                </div>
                            </Card.Body>
                            </Link>
                        </Card>

                        <Modal
                            show={show && selectedRecipe === recipe}
                            onHide={handleClose}
                        >
                            <Modal.Header closeButton>
                            </Modal.Header>
                            <Modal.Body>
                                <RecipeDetail
                                    recipe={recipe}
                                    onSuccess = {handleClose}/>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                );
            })}
        </div>
    );
}

export default RecipeGridList;