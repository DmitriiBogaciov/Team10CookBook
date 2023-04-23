import {Card} from "react-bootstrap";
import React, { useState, useEffect } from "react";





function RecipeDetail(props) {
    const [categories, setCategories] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    const fetchCategories = async () => {
        const response = await fetch("/category/list"); // Замените на ваш URL для получения категорий
        const data = await response.json();
        setCategories(data);
    };

    const fetchIngredients = async () => {
        const response = await fetch("/ingredient/list"); // Замените на ваш URL для получения ингредиентов
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
                    </Card.Body>
                </Card>
            </div>
        </div>
    );

}

export default RecipeDetail
