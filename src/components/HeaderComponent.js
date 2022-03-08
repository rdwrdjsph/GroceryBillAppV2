import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { AiOutlineUserAdd, AiOutlineInfoCircle, AiOutlineUnorderedList, AiOutlineLogout } from "react-icons/ai";
import { IoReceiptOutline } from "react-icons/io5";

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
                <nav style={{ paddingLeft: "25px", paddingRight: "25px", backgroundColor: "#03256C" }} className="navbar navbar-expand navbar-dark">
                    <div className="navbar-brand">
                        Grocery Bill Application
                    </div>
                    <div className="navbar-nav ms-auto">
                        {showAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link" style={{ color: "white" }}>
                                    <span><AiOutlineUserAdd /></span>
                                </Link>
                            </li>
                        )}

                        {showSuperAdminBoard && (
                            <><li className="nav-item">
                                <Link to={"/register"} className="nav-link" style={{ color: "white" }}>
                                    <span><AiOutlineUserAdd /></span>
                                </Link>
                            </li><li className="nav-item">
                                    <Link to={"/bills"} className="nav-link" style={{ color: "white" }}>
                                        <span><IoReceiptOutline /></span>
                                    </Link>
                                </li></>

                        )}

                        {currentUser && (
                            <li className="nav-item">
                                <Link to={"/list"} className="nav-link" style={{ color: "white" }}>
                                    <span><AiOutlineUnorderedList /></span>
                                </Link>
                            </li>
                        )}
                    </div>

                    {currentUser ? (
                        <div className="navbar-nav ">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link" style={{ color: "white" }}>
                                    <span><AiOutlineInfoCircle /></span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={this.logOut} style={{ color: "white" }}>
                                    <span><AiOutlineLogout /></span>
                                </a>
                            </li>
                        </div>
                    ) : ""}
                </nav>
            </div>
        );
    }
}

export default HeaderComponent;