import React, { Component } from 'react';

class HeaderLoginComponent extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <nav style={{paddingLeft: "25px", backgroundColor: "#03256C"}} className="navbar navbar-expand navbar-dark">
                    <div className="navbar-brand">
                        Grocery Bill Application
                    </div>
                </nav>
            </div>
        );
    }
}

export default HeaderLoginComponent;