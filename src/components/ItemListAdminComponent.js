import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ItemService from '../services/ItemService';
import { BiEdit, BiTrash } from "react-icons/bi";
import { BsCheckSquare, BsXSquare } from "react-icons/bs";
import { MdAddShoppingCart } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

class ItemListAdminComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [],
            itemId: '',
            name: '',
            price: '',
            discounted: '',
            discountPercentage: '',
            discountedPrice: '',
            inputType: '',
            labelType: '',
            modalShow: false,
            modal2Show: false
        }
        this.addItem = this.addItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.getItemDataForUpdate = this.getItemDataForUpdate.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changeDiscountHandler = this.changeDiscountHandler.bind(this);
        this.changeDiscountPercentageHandler = this.changeDiscountPercentageHandler.bind(this);
        this.hiddenHandler = this.hiddenHandler.bind(this);
        this.cancel = this.cancel.bind(this);

    }

    componentDidMount() {
        ItemService.getItem().then((res) => {
            this.setState({ items: res.data });
        });
    }

    getItemDataForUpdate(pItemid) {
        ItemService.getItemById(pItemid).then((res) => {
            let item = res.data;
            this.setState({
                itemId: item.itemId,
                name: item.name,
                price: item.price,
                discounted: item.isDiscounted,
                discountPercentage: item.discountPercentage,
                discountedPrice: item.discountedPrice,
                inputType: this.inputTypeMount(item.isDiscounted),
                labelType: this.labelTypeMount(item.isDiscounted)
            });
        });
    }

    addItem() {
        this.props.history.push("/add-item");
    }

    deleteItem(itemId) {
        ItemService.deleteItem(itemId).then(res => {
            this.setState({ items: this.state.items.filter(item => item.itemId !== itemId) });
        })
    }

    discountedChecker(item) {
        if (item == true) {
            return <BsCheckSquare />
        } else {
            return <BsXSquare />
        }
    }

    changeNameHandler = (event) => {
        this.setState({ name: event.target.value });
    }

    changePriceHandler = (event) => {
        this.setState({ price: event.target.value });
    }

    changeDiscountHandler = (event) => {
        const checked = event.target.checked;
        if (checked === true) {
            this.setState({ discounted: true });
            this.hiddenHandler(true);
        } else {
            this.setState({ discounted: false });
            this.hiddenHandler(false);
        }
    }

    hiddenHandler = (condition) => {
        if (condition == true) {
            this.setState({ inputType: "number" });
            this.setState({ labelType: "" });
            this.setState({ discountPercentage: "1" });

        } else {
            this.setState({ inputType: "hidden" });
            this.setState({ labelType: "hidden" });
            this.setState({ discountPercentage: 0 });
        }
    }

    inputTypeMount = (condition) => {
        if (condition == true) {
            return "number";
        } else {
            return "hidden";
        }
    }

    labelTypeMount = (condition) => {
        if (condition == true) {
            return "";
        } else {
            return "hidden";
        }
    }

    changeDiscountPercentageHandler = (event) => {
        this.setState({ discountPercentage: event.target.value });
    }

    updateItem = (itemId) => {

        const total = this.state.price - ((this.state.discountPercentage / 100) * this.state.price);

        let item = {
            itemId: this.state.itemId,
            name: this.state.name,
            price: this.state.price,
            discounted: this.state.discounted,
            discountPercentage: this.state.discountPercentage,
            discountedPrice: total
        };
        console.log('item => ' + JSON.stringify(item));

        ItemService.updateItem(item, itemId).then(res => {
            alert("Item Update Successful!");
            this.props.history.push("/list");
            window.location.reload();
        });
    }

    cancel = (e) => {
        e.preventDefault();
        this.props.history.push("/list");
        window.location.reload();
    }

    render() {
        return (
            <div>
                <div>
                    <h2 className="text-center">ITEM LIST</h2>
                    <button className="btn btn-secondary" onClick={this.addItem}><MdAddShoppingCart /> Add Item</button>
                </div><br />
                <div className="row table-responsive">
                    <table className="table table-hover text-center table-light">
                        <thead className="table-dark">
                            <tr>
                                <th>Item ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Discounted Price</th>
                                <th>Discounted?</th>
                                <th>Discount %</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.items.map(
                                    item =>
                                        <tr key={item.itemId}>
                                            <td>{item.itemId}</td>
                                            <td>{item.name}</td>
                                            <td>&#8369;{item.price}</td>
                                            <td>&#8369;{item.discountedPrice}</td>
                                            <td>{this.discountedChecker(item.isDiscounted)}</td>
                                            <td>{item.discountPercentage}%</td>
                                            <td>
                                                <button onClick={() => { this.setState({ modal2Show: true }); this.getItemDataForUpdate(item.itemId); }} className="btn btn-secondary"><BiEdit /></button>
                                                <button style={{ marginLeft: "15px" }} onClick={() => { this.setState({ modalShow: true }); this.setState({ itemId: item.itemId }); }} className="btn btn-secondary"><BiTrash /></button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

                <Modal
                    show={this.state.modalShow}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Confirmation
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete this item?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { this.deleteItem(this.state.itemId); this.setState({ modalShow: false }); }}>
                            Yes
                        </Button>
                        <Button variant="secondary" onClick={() => this.setState({ modalShow: false })}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={this.state.modal2Show}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            UPDATE ITEM
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form
                            onSubmit={this.handleRegister}
                            ref={c => {
                                this.form = c;
                            }}
                        >
                            {!this.state.successful && (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="username">Item Name</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.changeNameHandler}
                                            validations={[required]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="contactNumber">Price</label>
                                        <Input
                                            type="number"
                                            className="form-control"
                                            name="price"
                                            value={this.state.price}
                                            onChange={this.changePriceHandler}
                                            validations={[required]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-check-label" htmlFor="discounted">Discounted?</label>
                                        <Input
                                            type="checkbox"
                                            className="form-check-input"
                                            name="discounted"
                                            value="true"
                                            onChange={this.changeDiscountHandler}
                                            checked={this.state.discounted}
                                            id="flexCheckDefault" />
                                    </div>

                                    <div className="form-group">
                                        <label hidden={this.state.labelType} htmlFor="contactNumber">Discount Percentage</label>
                                        <Input
                                            type={this.state.inputType}
                                            className="form-control"
                                            name="discountPercentage"
                                            value={this.state.discountPercentage}
                                            onChange={this.changeDiscountPercentageHandler}
                                            validations={[required]}
                                        />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <button className="btn btn-success" onClick={() => this.updateItem(this.state.itemId)}>Save</button>
                                        <button className="btn btn-danger" onClick={() => {this.setState({ modal2Show: false }); this.cancel();}} style={{ marginLeft: "10px" }}>Cancel</button>
                                    </div>
                                </div>
                            )}

                            {this.state.message && (
                                <div className="form-group text-center">
                                    <div style={{ textAlign: "center" }}
                                        className={
                                            this.state.successful
                                                ? "alert alert-success"
                                                : "alert alert-danger"
                                        }
                                        role="alert"
                                    >
                                        {this.state.message}
                                    </div>
                                </div>
                            )}
                            <CheckButton
                                style={{ display: "none" }}
                                ref={c => {
                                    this.checkBtn = c;
                                }}
                            />
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default withRouter(ItemListAdminComponent);
