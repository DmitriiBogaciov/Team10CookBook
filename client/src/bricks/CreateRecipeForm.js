import Icon from "@mdi/react";
import {Form, Modal} from 'react-bootstrap';
import { mdiPlus } from "@mdi/js";
import { useState } from 'react'

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
                                <Form.Control type="file"/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Ingredients</Form.Label>
                                <Form.Select>

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