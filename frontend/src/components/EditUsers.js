import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {getAll} from '../crud'
import {uriBase, apiVer} from '../config'
import UserCard from  './UserCard'
import Row from 'react-bootstrap/Row'

const EditUsers = (props) => {
     
    const [users, setUSers] = useState([])

    const refresh = () => {

        getAll(`${uriBase}/${apiVer}/users`)
        .then(allUsers => {
            setUSers(allUsers)
        })
        .catch(err => {
            console.log(err)
        })
    }
    useEffect( () => {
        refresh()
    },[])

    return (
        <div>
            <h2>EDIT USERS</h2>
            <br></br>
            <Row>
            {
                users.map( user => {
                    return <UserCard key={user._id} user={user} refresh={refresh}></UserCard>
                })
            }
            </Row>
            <br></br>
            <Link to="/Home">Home Page</Link>
            <br></br>
        </div>
    );
};

export default EditUsers;
