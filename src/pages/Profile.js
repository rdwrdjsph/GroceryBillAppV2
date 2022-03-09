import React, { Component } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import ProfileComponent from '../components/ProfileComponent';

import { withRouter } from 'react-router-dom';

import AuthService from "../services/AuthService";

class Profile extends Component {
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
                <div className="container">
                    {this.state.currentUser && (
                        <ProfileComponent />
                    )}
                    {!this.state.currentUser && (
                         this.props.history.push("/login")
                    )}
                </div>
            </div>
        );
    }
}

export default withRouter(Profile);