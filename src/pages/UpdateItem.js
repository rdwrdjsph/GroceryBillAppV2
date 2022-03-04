import React, { Component } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import UpdateItemComponent from '../components/UpdateItemComponent';

class UpdateItem extends Component {
    render() {
        return (
            <div>
                <HeaderComponent />
                <br />  
                <div className="container">
                    <UpdateItemComponent />
                </div>
            </div>
        );
    }
}

export default UpdateItem;