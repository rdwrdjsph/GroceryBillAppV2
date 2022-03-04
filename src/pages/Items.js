import React, { Component } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import ItemsComponent from '../components/ItemsComponent';

class Items extends Component {
    render() {
        return (
            <div>
                <HeaderComponent />
                <br />
                <div className="container mt-3">
                    <ItemsComponent />
                </div>
            </div>
        );
    }
}

export default Items;