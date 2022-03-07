import React, { Component } from 'react';
import { RiFileList2Line } from "react-icons/ri";
import { BsCart } from "react-icons/bs";

class ReceiptComponent extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const cartItems = this.props.cartItems;
        const countCartItems = cartItems.length;

        const regularPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
        const discountedPrice = cartItems.reduce((a, c) => a + c.qty * c.discountedPrice, 0);
        const totalPrice = discountedPrice;

        return (
            <div className="block col-1">
            <span>
                <h5>
                    <strong>Cart Items</strong>{' '}
                    {countCartItems ? (<h6><BsCart />{countCartItems}</h6>) 
                    : ('')}
                    {' '}
                </h5>
            </span>
            <hr />
            <div>{cartItems.length === 0 && <div>Cart is Empty</div>}</div>
            {cartItems.map((item) => (
                <div key={item.itemId} className="row">
                    <div className="col-2">{item.name}</div>
                    <div className="col-2">
                      
                    </div>
                    <div className="col-2 text-right">
                        {item.qty} x &#8369;{item.price}
                    </div>
                </div>
            ))}
            {cartItems.length !== 0 && (
                <>
                    <hr></hr>
                    <div className="row">
                        <div className="col-2">Regular Price</div>
                        <div className="col-1 text-right">&#8369;{regularPrice}</div>
                    </div>
                    <div className="row">
                        <div className="col-2">Discounted Price</div>
                        <div className="col-1 text-right">&#8369;{discountedPrice}</div>
                    </div>

                    <div className="row">
                        <div className="col-2">
                            <strong>Total Price</strong>
                        </div>
                        <div className="col-1 text-right">
                            <strong>&#8369;{totalPrice}</strong>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <button className="btn btn-secondary" onClick={() => alert('Implement Checkout!')}><RiFileList2Line />Receipt</button>
                    </div>
                </>
            )}
        </div>
        );
    }
}

export default ReceiptComponent;