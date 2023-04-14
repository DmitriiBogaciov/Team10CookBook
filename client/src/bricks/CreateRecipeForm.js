import Icon from "@mdi/react";
import {Form, Modal} from 'react-bootstrap';
import { mdiPlus } from "@mdi/js";
import { useState } from 'react'
import IngredientList from "./IngredientList";
import CategoryList from "./CategoryList";

function CreateRecipeForm() {
    const [isModalShown, setShow] = useState(false);

    const handleShowModal = () => setShow(true);
    const handleCloseModal = () => setShow(false);

    return (
        <>
            <Modal show={isModalShown} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create recipe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label >Recipe name</Form.Label>
                                <Form.Control type="text" style={{maxWidth: '70%'}}/>

                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="file" size="sm"/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Ingredients</Form.Label>
                                <div className="d-flex">
                                    <Form.Select size="sm" style={{marginRight: '8px' }}>
                                        <IngredientList/>
                                    </Form.Select>
                                    <Form.Control size="sm" type="number" placeholder="Amount" style={{ maxWidth: '100px', marginRight: '8px' }}/>
                                    <Form.Control size="sm" type="text" placeholder="Unit" style={{ maxWidth: '100px' }}/>
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Select size="sm">
                                    <CategoryList/>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
            </Modal>
            <Icon
                path={mdiPlus}
                style={{ color: "black", cursor: "pointer", alignSelf: 'center', marginRight: '8px'}}
                size={1.3}
                onClick={handleShowModal}
            />
        </>
    )
}

export default CreateRecipeForm;