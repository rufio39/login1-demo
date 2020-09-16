import React from 'react';
import { Card, Button } from 'react-bootstrap'
import { deleteOne } from '../crud'
import { uriBase, apiVer } from '../config'
import EditUserModal from './EditUserModal';

const UserCard = (props) => {

    const deleteOnClickHandler = (event) => {

        deleteOne(`${uriBase}/${apiVer}/users/${props.user.userName}`, props.user)
            .then(result => {
                props.refresh()
            })
            .catch(err => {
                console.log(err.message)
            })


    }

    return (
        <div>
            <Card bg="info" style={{ width: '18rem' }}>
                <Card.Header as="h5">User name</Card.Header>
                <Card.Body>
                    <Card.Title>{props.user.userName}</Card.Title>
                    <Card.Text>
                        {`${props.user.userName}`}
                    </Card.Text>
                    <EditUserModal user={props.user} refresh={props.refresh}>
                        <Button variant="primary" size="sm">Update</Button>
                    </EditUserModal>
                    <Button variant="danger" size="sm" onClick={deleteOnClickHandler}>Delete</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default UserCard;