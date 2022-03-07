import React, { Component } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import ListComponent from '../components/ListComponent';

class Items extends Component {
    render() {
        return (
            <div>
                <HeaderComponent />
                <br/>
                <div className="container">
                    <ListComponent />
                </div>
            </div>
        );
    }
}

export default Items;