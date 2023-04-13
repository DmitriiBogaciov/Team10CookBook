import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import Icon from '@mdi/react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { mdiGlassTulip, mdiReceiptTextEditOutline } from '@mdi/js';
import IngredientList from "./IngredientList";
import RecipeDetail from "./RecipeDetail";

function Recipe(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Card>
                <Card.Title>
                    <Icon path={mdiGlassTulip} size={1} color="red" />{" "}
                    {props.recipe.name}
                    <Button variant="primary" onClick={handleShow} className="ml-2">
                        Show Details
                    </Button>
                </Card.Title>
                <Card.Body>
                <div>
                    <Icon path={mdiReceiptTextEditOutline} size={1} />
                    {props.recipe.description}
                </div>
                <div>
                    Ingredients: <IngredientList ingredientList={props.recipe.ingredientList} />
                </div>
            </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.recipe.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RecipeDetail recipe={props.recipe} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Recipe;