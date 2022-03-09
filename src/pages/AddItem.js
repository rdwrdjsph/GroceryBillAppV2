import React, { Component } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import AddItemComponent from '../components/AddItemComponent';

import { withRouter } from 'react-router-dom';

import AuthService from "../services/AuthService";

class AddItem extends Component {
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
                        <AddItemComponent />
                    )}
                    {!this.state.currentUser && (
                        this.props.history.push("/login")
                    )}
                </div>
            </div>
        );
    }
}

export default withRouter(AddItem);