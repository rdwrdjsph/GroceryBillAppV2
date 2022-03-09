import React, { Component } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import RegisterComponent from '../components/RegisterComponent';

import { withRouter } from 'react-router-dom';

import AuthService from "../services/AuthService";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: AuthService.getCurrentUser()
        };
    }
    render() {
        return (
            <div>
                <HeaderComponent />
                <div className="container mt-3">
                    {this.state.currentUser && (
                        <RegisterComponent />
                    )}
                    {!this.state.currentUser && (
                         this.props.history.push("/login")
                    )}
                </div>
            </div>
        );
    }
}

export default withRouter(Login);