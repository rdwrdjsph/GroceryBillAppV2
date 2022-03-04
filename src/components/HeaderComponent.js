import React, { Component } from 'react';
import { Link } from "react-router-dom";

import EventBus from "../common/EventBus";
import AuthService from "../services/AuthService";

class HeaderComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showSuperAdminBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };

        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
                showSuperAdminBoard: user.roles.includes("ROLE_SUPER_ADMIN"),
            });
        }

        EventBus.on("logout", () => {
            this.logOut();
        });
    }

    componentWillUnmount() {
        EventBus.remove("logout");
    }

    logOut() {
        AuthService.logout();
        this.setState({
            showSuperAdminBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        });
    }

    render() {
        const { currentUser, showAdminBoard, showSuperAdminBoard } = this.state;

        return (
            <div>
                <nav style={{paddingLeft: "25px"}}className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">
                        Grocery Bill App
                    </Link>
                    <div className="navbar-nav mr-auto">
                        {showAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Add User
                                </Link>
                            </li>
                        )}

                        {showSuperAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Add Admin
                                </Link>
                            </li>
                        )}

                        {currentUser && (
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    Profile
                                </Link>
                            </li>
                        )}
                    </div>

                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/items"} className="nav-link">
                                    Items List
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={this.logOut}>
                                    LogOut
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>
            </div>
        );
    }
}

export default HeaderComponent;