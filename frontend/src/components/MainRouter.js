import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { LoggedInProvider } from "./LoggedInContext"
import ProtectedRoute from "./ProtectedRoute"
    
import Home from './Home'
import Login from './Login'
import ForgotPassword from './ForgotPassword'
import SignUp from './SignUp'
import EditUsers from './EditUsers'


export default function MainRouter() {

    return (
        <LoggedInProvider>
            <Router>
                <Switch>
                    <Route path="/signUp" component={SignUp}></Route>
                    <Route path="/forgotpassword" component={ForgotPassword}></Route>
                    <Route path="/login" component={Login}></Route>
                    <ProtectedRoute path="/admin" component={EditUsers}/>
                    <Route path="/" component={Home}></Route>   
                </Switch>
            </Router>
        </LoggedInProvider>
    )
}