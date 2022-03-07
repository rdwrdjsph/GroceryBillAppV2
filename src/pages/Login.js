import React, { Component } from 'react';
import HeaderLoginComponent from '../components/HeaderLoginComponent';
import LoginComponent from '../components/LoginComponent';

class Login extends Component {
    render() {
        return (
            <div>
                <HeaderLoginComponent />
                <br />
                <div className="container">
                    <LoginComponent />
                </div>
            </div>
        );
    }
}

export default Login;