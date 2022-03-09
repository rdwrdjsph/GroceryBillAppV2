import React, { Component } from 'react';
import BillsListComponent from '../components/BillsListComponent';
import HeaderComponent from '../components/HeaderComponent';

import { withRouter } from 'react-router-dom';

import AuthService from "../services/AuthService";

class Bills extends Component {
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
                        <BillsListComponent />
                    )}
                     {!this.state.currentUser && (
                         this.props.history.push("/login")
                    )}
                </div>
            </div>
        );
    }
}

export default withRouter(Bills);