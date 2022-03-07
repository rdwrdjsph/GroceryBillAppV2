import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { RiFileList2Line } from "react-icons/ri";
import { BsCart } from "react-icons/bs";


class CartComponent extends Component {
    constructor(props) {
        super(props)

        this.generateReceipt = this.generateReceipt.bind(this);
    }

    generateReceipt() {  
        this.props.history.push("/receipt");
    }

    render() {
        const cartItems = this.props.cartItems;
        const onAdd = this.props.onAdd;
        const onRemove = this.props.onRemove;

        const regularPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
        const discountedPrice = cartItems.reduce((a, c) => a + c.qty * c.discountedPrice, 0);
        const totalPrice = discountedPrice;
        return (
            <aside style={{marginBottom:"0px"}} className="block col-1">
                <h5><strong>Cart Items</strong></h5>
                <hr />
                <div>{cartItems.length === 0 && <div>Cart is Empty</div>}</div>
                {cartItems.map((item) => (
                    <div key={item.itemId} className="row">
                        <div className="col-5">{item.name}</div>
                        <div className="col-2">
                            <button onClick={() => onAdd(item)} className="add">+</button>
                            <button onClick={() => onRemove(item)} className="remove">-</button>
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
                            <button className="btn btn-secondary" onClick={this.generateReceipt}><RiFileList2Line /> Checkout</button>
                        </div>
                    </>
                )}
            </aside>
        );
    }
}

export default withRouter(CartComponent);