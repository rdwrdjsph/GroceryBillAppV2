import React, { Component } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import ListComponent from '../components/ListComponent';

import { withRouter } from 'react-router-dom';

import AuthService from "../services/AuthService";

class Items extends Component {
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
                <br />
                <div className="container">
                    {this.state.currentUser && (
                        <ListComponent />
                    )}
                    {!this.state.currentUser && (
                         this.props.history.push("/login")
                    )}
                </div>
            </div>
        );
    }
}

export default withRouter(Items);