import React, { Component } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import ReceiptComponent from '../components/ReceiptComponent';

class Receipt extends Component {
    render() {
        return (
            <div>
                <HeaderComponent />
                <div className="container">
                    <ReceiptComponent />
                </div>
            </div>
        );
    }
}

export default Receipt;