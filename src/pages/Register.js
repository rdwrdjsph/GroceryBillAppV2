import React, { Component } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import RegisterComponent from '../components/RegisterComponent';

class Login extends Component {
    render() {
        return (
            <div>
                <HeaderComponent />
                <br />
                <div className="container mt-3">
                    <RegisterComponent />
                </div>
            </div>
        );
    }
}

export default Login;