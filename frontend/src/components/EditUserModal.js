import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { updateOne } from '../crud'
import { uriBase, apiVer } from '../config'

const EditUserModal = (props) => {

    const [userName, setUserName] = useState(props.user.userName)
    const [show, setShow] = useState(false);
    const [password, setPassword] = useState(props.user.password)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const userNameOnChangeHandler = (event) => {

        event.preventDefault()
        setUserName(event.target.value)
    }

    const passwordOnChangeHandler = (event) => {

        event.preventDefault()
        setPassword(event.target.value)
    }

    const saveOnClickHandler = (event) => {

        event.preventDefault()

        try {
            updateOne(`${uriBase}/${apiVer}/users/${props.user.userName}`, { userName, password })
            console.log("Updated!")

        }
        catch (err) {
            console.log(err.message)
        }

        setShow(false)
        props.refresh()
    }
    return (
        <React.Fragment>
            <Button variant="primary" size="sm" onClick={handleShow}>Update</Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title><h2>EDIT {props.user.fName} {props.user.lName}</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="editUserModalUserName">
                            <Form.Control type="text" placeholder="Enter username" onChange={userNameOnChangeHandler} value={userName}
                                style={{ width: '20rem' }} />
                        </Form.Group>

                        <Form.Group controlId="editUserModalUserName">
                            <Form.Control type="password" placeholder="New Password" onChange={passwordOnChangeHandler}
                                style={{ width: 'auto' }} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={saveOnClickHandler}>
                        Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
};

export default EditUserModal;