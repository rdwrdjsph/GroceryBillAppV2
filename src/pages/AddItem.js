import React, { Component } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import AddItemComponent from '../components/AddItemComponent';

class AddItem extends Component {
    render() {
        return (
            <div>
                <HeaderComponent />
                <br />
                <div className="container">
                    <AddItemComponent />
                </div>
            </div>
        );
    }
}

export default AddItem;