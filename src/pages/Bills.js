import React, { Component } from 'react';
import BillsListComponent from '../components/BillsListComponent';
import HeaderComponent from '../components/HeaderComponent';

class Bills extends Component {
    render() {
        return (
            <div>
                <HeaderComponent />
                <br/>
                <div className="container">
                    <BillsListComponent />
                </div>
            </div>
        );
    }
}

export default Bills;