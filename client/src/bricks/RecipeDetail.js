import {useEffect, useState} from 'react'

function RecipeDetail(recipe) {
    const [isModalShown, setShow] = useState(false)
    const [recipeDetailCall, setRecipeDetailCall] =
        useState({
            state: "pending"
        });

    const handleShowModal = () => setShow(true);
    const handleCloseModal = () => setShow(false);

    useEffect(() => {
        if (isModalShown) fetchData();
    }, [isModalShown, recipe])

    const fetchData = async () => {
        setRecipeDetailCall({state: "pending"})

        const res = await fetch(`http://localhost:3000/recipe/get?id=${recipe.id}`);
        const data = await res.json()

        if (res.status >= 400) {
            setRecipeDetailCall({ state: "error", error: data});
        } else {
            setRecipeDetailCall({state: "success", data });
        }
    };

    return (
        <>
            <span>{recipe.description}</span>
        </>
    )
}

export default RecipeDetail
