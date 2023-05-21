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
