import {useEffect, useState} from 'react'

function RecipeDetail(recipe) {
    const [isModalShown, setShow] = useState(false)

    const handleShowModal = () => setShow(true);
    const handleCloseModal = () => setShow(false);


    return (
        <>
            <span>{recipe.description}</span>
        </>
    )
}

export default RecipeDetail
