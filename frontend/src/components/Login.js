import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Row, Col } from 'react-bootstrap'
import { LoggedInContext } from "./LoggedInContext"

export default function Login(props) {

    let [username, setUserName] = React.useState("")
    let [password, setPassword] = React.useState("")

    // context
    let {checkUser, loggedIn} = React.useContext(LoggedInContext)
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
        checkUser(username, password)
        // if exists check password

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
            <h1>Login Page</h1>
            {
                isLoggedIn()
            }
            <br></br>
            <Form>
                <Row>
                    <Col>
                        <Form.Group controlId="LoginUsername">
                            <Form.Label><h2>Username</h2></Form.Label>
                            <Form.Control type="text" placeholder="Enter username" onChange={usernameOnChangeHandler} value={username}
                                style={{ width: '30rem' }} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="LoginPassword">
                            <Form.Label><h2>Password</h2></Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={passwordOnChangeHandler} value={password}
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

