import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { IoReceiptOutline } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import AuthService from '../services/AuthService';
import BillService from '../services/BillService';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

class CartComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalShow: false,
            currentUser: AuthService.getCurrentUser()
        }

        this.exportPdf = this.exportPdf.bind(this);
        this.saveBills = this.saveBills.bind(this);

    }

    exportPdf() {
        html2canvas(document.querySelector("#capture")).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 7, 10);
            pdf.save("receipt.pdf");
            this.props.history.push("/list");
            window.location.reload();
        });
    }

    saveBills(pClerkOnDuty, pRegularPrice, pDiscountedPrice, pTotalPrice) {
        BillService.addBill(pClerkOnDuty, pRegularPrice, pDiscountedPrice, pTotalPrice).then (res =>{
            alert("Thank you for Shopping!");
        });
    }
    

    render() {
        const cartItems = this.props.cartItems;
        const onAdd = this.props.onAdd;
        const onRemove = this.props.onRemove;

        const clerkOnDuty = this.state.currentUser.firstName +" "+ this.state.currentUser.lastName;

        const regularPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
        const discountedPrice = cartItems.reduce((a, c) => a + c.qty * c.discountedPrice, 0);
        const totalPrice = discountedPrice;
        return (
            <aside style={{ marginBottom: "0px" }} className="block col-1">
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
                            <Button variant="secondary" onClick={() => this.setState({ modalShow: true })}>
                                <IoReceiptOutline /> Checkout
                            </Button>
                        </div>
                    </>
                )}

                <Modal
                    show={this.state.modalShow}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            RECEIPT
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body id="capture">
                        Clerk on Duty: {clerkOnDuty}
                        <br/><br/>
                        <div>{cartItems.length === 0 && <div>Cart is Empty</div>}</div>
                        {cartItems.map((item) => (
                            <div key={item.itemId} className="row">
                                <div className="col-5">{item.name}</div>
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
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {this.exportPdf(); this.saveBills(clerkOnDuty, regularPrice, discountedPrice, totalPrice);}}>
                            <IoReceiptOutline /> Print
                        </Button>
                        <Button variant="secondary" onClick={() => this.setState({ modalShow: false })}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </aside>
        );
    }
}

export default withRouter(CartComponent);