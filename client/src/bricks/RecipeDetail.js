import {Card, Button} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import UpdateRecipeForm from "./UpdateRecipeForm";

function RecipeDetail(props) {
    const [isEditModalShown, setEditModalShow] = useState(false);
    const [isDeleteModalShown, setDeleteModalShow] = useState(false);

    const handleShowEditModal = () => setEditModalShow(true);
    const handleCloseEditModal = () => {
        setEditModalShow(false);
    };
    const handleShowDeleteModal = () => setDeleteModalShow(true);
    const handleCloseDeleteModal = () => setDeleteModalShow(false);

    const [categories, setCategories] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    const fetchCategories = async () => {
        const response = await fetch("/category/list");
        const data = await response.json();
        setCategories(data);
    };

    const fetchIngredients = async () => {
        const response = await fetch("/ingredient/list");
        const data = await response.json();
        setIngredients(data);
    };

    const data = {
        id: props.recipe.id
    };
    console.log(data)

    const handleDeleteRecipe = async () => {
        try {
            const response = await fetch(`/recipe/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to delete recipe");
            }
        } catch (error) {
            console.error(error);
        } finally {
            props.onSuccess();
            handleCloseDeleteModal();
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchCategories();
            await fetchIngredients();
        };
        fetchData();
    }, []);
    return (
        <div className="row">
            <div key={props.recipe.id}>
                <Card>
                    <Card.Body>
                        <Card.Title className="mb-3" style={{ marginLeft: "10px" }}>
                            {props.recipe.name}
                        </Card.Title>
                        <Card.Subtitle className="mb-3 text-muted" style={{ marginLeft: "10px" }}>
                            {props.recipe.categoryIdList.map((categoryId) => {
                                const category = categories.find((cat) => cat.id === categoryId);
                                return <span>{category ? category.name + " | " : ""}</span>;
                            })}
                        </Card.Subtitle>
                        <Card.Text style={{ marginLeft: "10px" }}>{props.recipe.description}</Card.Text>
                        <Card.Text style={{ marginLeft: "10px" }}>
                            <strong>Ingredients:</strong>
                            <div className="container">
                                <div className="row">
                                    {props.recipe.ingredientList.map((ingredient, index) => {
                                        const ingredientData = ingredients.find((ing) => ing.id === ingredient.id);
                                        return (
                                            <React.Fragment key={index}>
                                                <div className="col-4 mb-1">{ingredientData ? ingredientData.name : ""}</div>
                                                <div className="col-4 mb-1">{ingredient.amount}</div>
                                                <div className="col-4 mb-1">{ingredient.unit}</div>
                                            </React.Fragment>
                                        );
                                    })}
                                </div>
                            </div>
                        </Card.Text>
                        <Card.Text style={{ marginLeft: "10px" }}>
                            <strong>Method of Preparation:</strong>
                            <p>{props.recipe.method}</p>
                        </Card.Text>
                        <div className="row">
                            <div className="col-12">
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Button variant="danger" size="sm" onClick={handleShowDeleteModal}>
                                        Delete Recipe
                                    </Button>
                                    <Button variant="primary" size="sm" onClick={handleShowEditModal}>
                                        Edit Recipe
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
            <Modal show={isDeleteModalShown} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this recipe?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        No
                    </Button>
                    <Button variant="danger" onClick={handleDeleteRecipe}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
            <UpdateRecipeForm
                show={isEditModalShown}
                onHide={handleCloseEditModal}
                recipe={props.recipe}
                onSuccess={handleCloseEditModal}
                categories={categories}
            />
        </div>
    );

}

export default RecipeDetail
