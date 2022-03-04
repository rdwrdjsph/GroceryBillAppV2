import React, { Component } from 'react';
import { Link } from "react-router-dom";

class HeaderLoginComponent extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <nav style={{paddingLeft: "25px"}}className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">
                        Grocery Bill Application
                    </Link>
                </nav>
            </div>
        );
    }
}

export default HeaderLoginComponent;