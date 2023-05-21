import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipeList from './RecipeList';

function CategoryRecipes() {
    const { categoryId } = useParams();
    const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/recipe/listByCategoryId?categoryId=${categoryId}`)
      .then(response => response.json())
      .then(data => setRecipes(data))
      .catch(error => console.error(error));
  }, [categoryId]);

  return (
    <div>
      <RecipeList recipeList={recipes} />
    </div>
  );
}

export default CategoryRecipes;
