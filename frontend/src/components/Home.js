import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, Row, Col } from 'react-bootstrap'
import { LoggedInContext } from "./LoggedInContext"

export default function Home(props) {

    let {users, loggedIn} = React.useContext(LoggedInContext)

    const isLoggedIn = () => {
            
        if (loggedIn) {
            return (<h3>Logged in!</h3>)
        } else {
            return (<h3>Not logged in</h3>)
        }

    }

    

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            {
                isLoggedIn()
            }
            <br></br>
            <Row>
                <Col><h2>Brief description.</h2>
                <p>here i have created some links to the other pages for the website and have
                    added this side text for a small description and practice.</p>
                    <br></br>
                    <h3>Steps to create user.</h3>
                    <li>get signed up</li>
                    <li>select log in</li>
                    <li>if needing to edit user first log in then 
                        with admin controls, delete users.
                    </li>
                </Col>
                <Col>
            <Button variant="outline-dark">
                <Link to="/Login"><h3>Login Page</h3></Link>
            </Button>
            <br></br>
            <br></br>
            <Button variant="outline-dark">
                <Link to="/ForgotPassword"><h3>Forgot Password</h3></Link>
            </Button>
            <br></br>
            <br></br>
            <Button variant="outline-dark" >
                <Link to="/SignUp"><h3>Sign Up</h3></Link>
            </Button>
            <br></br>
            <br></br>
            <Button variant="outline-dark" >
                <Link to="/admin"><h3>Edit Users</h3></Link>
                {isLoggedIn()}
            </Button>
            </Col>
            <Col>
            <h2>More info..</h2>
            <p>for more information please refer to www.whatsarandomwebsitewithinfocalledagain.com.
                or give us a call at 666... yep thats the number. and for help online with question well your out of luck,
                our online support is non existant. have a nice day!
            </p>
            </Col>
            </Row>
            {
                users.map(user => {
                    return <Card bg="info" style={{ width: '18rem' }}>
                        <Card.Title>Wizard</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Username</Card.Subtitle>
                        <Card.Body key={user.username}>{user.username}</Card.Body>
                    </Card>
                })
            }
            <br></br>
            <Row>
                <Col>
                    <Button variant="primary">Facebook</Button>
                </Col>
                <br></br>
                <br></br>
                <Col>
                    <Button variant="success">Amazon</Button>
                </Col>
            </Row>
        </div>

    );
}