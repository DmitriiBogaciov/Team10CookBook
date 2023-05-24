import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import UpdateRecipeForm from './UpdateRecipeForm';
import '../css/RecipePage.css'


function RecipePage() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [isEditModalShown, setEditModalShow] = useState(false);
    const [isDeleteModalShown, setDeleteModalShow] = useState(false);
    const [categories, setCategories] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [rating, setRating] = useState(null);
    const [isRated, setIsRated] = useState(false);

    const handleShowEditModal = () => setEditModalShow(true);
    const handleCloseEditModal = () => setEditModalShow(false);
    const handleShowDeleteModal = () => setDeleteModalShow(true);
    const handleCloseDeleteModal = () => setDeleteModalShow(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`/recipe/get?id=${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch recipe');
                }
                const data = await response.json();
                setRecipe(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRecipe();
    }, [id]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/category/list');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchIngredients = async () => {
            try {
                const response = await fetch('/ingredient/list');
                if (!response.ok) {
                    throw new Error('Failed to fetch ingredients');
                }
                const data = await response.json();
                setIngredients(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
        fetchIngredients();
    }, []);

    const handleDeleteRecipe = async () => {
        try {
            const response = await fetch(`/recipe/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: recipe.id }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete recipe');
            }
        } catch (error) {
            console.error(error);
        } finally {
            handleCloseDeleteModal();
        }
    };

    const handleRateRecipe = async (ratingValue) => {
        try {
            const response = await fetch('/rating/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recipeId: recipe.id, value: ratingValue }),
            });

            if (!response.ok) {
                throw new Error('Failed to rate recipe');
            }

            // Обновить состояние
            setRating(ratingValue);
            setIsRated(true);
        } catch (error) {
            console.error(error);
        }
    };

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className="recipe-page">
            <h1 className="recipe-title">{recipe.name}</h1>
            <div>
                {recipe.categoryIdList.map((categoryId) => {
                    const category = categories.find((cat) => cat.id === categoryId);
                    return <span key={categoryId}>{category ? category.name + ' | ' : ''}</span>;
                })}
            </div>
            <img src={`http://localhost:8000/storage/recipe-image/${recipe.imageId}.png`} alt="Recipe" />
            <h4>Description</h4>
            <p className="recipe-description">{recipe.description}</p>
            <h4>Ingredients</h4>
            <div className="container">
                <div className="row">
                    {recipe.ingredientList.map((ingredient, index) => {
                        const ingredientData = ingredients.find((ing) => ing.id === ingredient.id);
                        return (
                            <React.Fragment key={index}>
                                <div className="col-4 mb-1">{ingredientData ? ingredientData.name : ''}</div>
                                <div className="col-4 mb-1">{ingredient.amount}</div>
                                <div className="col-4 mb-1">{ingredient.unit}</div>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
            <h4>Method of preparation</h4>
            <p>{recipe.method}</p>
            <div>
                {/* Отображение оценки, если она уже была установлена */}
                {isRated ? (
                    <p>Your rating: {rating} stars</p>
                ) : (
                    // Кнопки для оценки
                        <fieldset className="rating">
                            <input type="radio" id="star5" name="rating" value="5" onClick={() => handleRateRecipe(5)} />
                            <label className="full" htmlFor="star5" title="Awesome - 5 stars"></label>

                            <input type="radio" id="star4half" name="rating" value="4 and a half" onClick={() => handleRateRecipe(4.5)} />
                            <label className="half" htmlFor="star4half" title="Pretty good - 4.5 stars"></label>

                            <input type="radio" id="star4" name="rating" value="4" onClick={() => handleRateRecipe(4)} />
                            <label className="full" htmlFor="star4" title="Pretty good - 4 stars"></label>

                            <input type="radio" id="star3half" name="rating" value="3 and a half" onClick={() => handleRateRecipe(3.5)} />
                            <label className="half" htmlFor="star3half" title="Meh - 3.5 stars"></label>

                            <input type="radio" id="star3" name="rating" value="3" onClick={() => handleRateRecipe(3)} />
                            <label className="full" htmlFor="star3" title="Meh - 3 stars"></label>

                            <input type="radio" id="star2half" name="rating" value="2 and a half" onClick={() => handleRateRecipe(2.5)} />
                            <label className="half" htmlFor="star2half" title="Kinda bad - 2.5 stars"></label>

                            <input type="radio" id="star2" name="rating" value="2" onClick={() => handleRateRecipe(2)} />
                            <label className="full" htmlFor="star2" title="Kinda bad - 2 stars"></label>

                            <input type="radio" id="star1half" name="rating" value="1 and a half" onClick={() => handleRateRecipe(1.5)} />
                            <label className="half" htmlFor="star1half" title="Meh - 1.5 stars"></label>

                            <input type="radio" id="star1" name="rating" value="1" onClick={() => handleRateRecipe(1)} />
                            <label className="full" htmlFor="star1" title="Sucks big time - 1 star"></label>

                            <input type="radio" id="starhalf" name="rating" value="half" onClick={() => handleRateRecipe(0.5)} />
                            <label className="half" htmlFor="starhalf" title="Sucks big time - 0.5 stars"></label>
                        </fieldset>
                )}
            </div>
            <div className="row">
                <div className="col-12">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="danger" size="sm" onClick={handleShowDeleteModal}>
                            Delete Recipe
                        </Button>
                        <Button variant="primary" size="sm" onClick={handleShowEditModal}>
                            Edit Recipe
                        </Button>
                    </div>
                </div>
            </div>
            <Modal show={isDeleteModalShown} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this recipe?</Modal.Body>
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
                recipe={recipe}
                onSuccess={handleCloseEditModal}
                categories={categories}
            />
        </div>
    );
}

export default RecipePage;
