import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Row, Col } from 'react-bootstrap'
import { createOne } from '../crud'
import { uriBase, apiVer } from '../config'
import { LoggedInContext } from './LoggedInContext'

export default function SignUp(props) {

    let [userName, setUserName] = React.useState("")
    let [password, setPassword] = React.useState("")

    let { token } = useContext(LoggedInContext)
    const userNameOnChangeHandler = (event) => {

        event.preventDefault()
        setUserName(event.target.value)
    }

    const passwordOnChangeHandler = (event) => {

        event.preventDefault()
        setPassword(event.target.value)
    }

    const submitOnClickHandler = (event) => {
        event.preventDefault()

        try {
            createOne(`${uriBase}/${apiVer}/users`, token, { userName, password })
            console.log("added")
        }
        catch (err) {
            console.log(err.message)
        }
    }

    return (

        <div>
            <h1>Sign Up</h1>
            <br></br>
            <Form>
                <Row>
                    <Col>
                        <Form.Group controlId="signUpUsername">
                            <Form.Label ><h2>Username</h2></Form.Label>
                            <Form.Control type="text" placeholder="Enter username" onChange={userNameOnChangeHandler} value={userName}
                                style={{ width: '30rem' }} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="signUpPassword">
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

            <br></br>
            <Link to="/Home">Home Page</Link>
        </div>

    )
}
