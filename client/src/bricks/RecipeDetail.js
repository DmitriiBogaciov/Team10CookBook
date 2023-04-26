import {Card, Button} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import UpdateRecipeForm from "./UpdateRecipeForm";

function RecipeDetail(props) {
    const [isEditModalShown, setEditModalShow] = useState(false);

    const handleShowEditModal = () => setEditModalShow(true);
    const handleCloseEditModal = () => {
        setEditModalShow(false);
    };

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
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={handleShowEditModal}
                            style={{ marginLeft: "10px" }}
                        >
                            Edit Recipe
                        </Button>
                    </Card.Body>
                </Card>
            </div>
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
