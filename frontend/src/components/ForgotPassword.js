import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import { Button, Row, Col } from 'react-bootstrap'
import { uriBase, apiVer } from '../config'
import { patchOne } from '../crud'
import { LoggedInContext } from "./LoggedInContext"


export default function ForgotPassword(props) {

    let [userName, setUserName] = React.useState("")
    let [password, setPassword] = React.useState("")
    let { loggedIn } = React.useContext(LoggedInContext)

    const usernameOnChangeHandler = (event) => {

        event.preventDefault()
        setUserName(event.target.value)
    }

    const passwordOnChangeHandler = (event) => {

        event.preventDefault()
        setPassword(event.target.value)
    }

    const submitOnClickHandler = (event) => {
        event.preventDefault()
        // check to see if user exist
        try {
            patchOne(`${uriBase}/${apiVer}/users/${userName}`, {password})
            console.log("Patched")  
        }
        catch (err) {
            console.log(err.message)
        }
        // if exists update password

        // display result
    }

    const isLoggedIn = () => {

        if (loggedIn) {
            return (<h3>Logged in!</h3>)
        } else {
            return (<h3>Not logged in</h3>)
        }

    }

    return (


        <div>
            <h1>Forgot Password</h1>
            {
                isLoggedIn()
            }
            <br></br>
            <Form>
                <Row>
                    <Col>
                        <Form.Group controlId="forgotPassUsername">
                            <Form.Label><h2>Username</h2></Form.Label>
                            <Form.Control type="text" placeholder="Enter username" onChange={usernameOnChangeHandler} value={userName}
                                style={{ width: '30rem' }} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="forgotPassPassword">
                            <Form.Label><h2>New Password</h2></Form.Label>
                            <Form.Control type="password" placeholder="New Password" onChange={passwordOnChangeHandler} value={password}
                                style={{ width: '30rem' }} />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="outline-success" type="submit" onClick={submitOnClickHandler} size="lg">
                    Submit
                </Button>
            </Form>
            <br></br>
            <Link to="/Home">Home Page</Link>
        </div>

    )
}

