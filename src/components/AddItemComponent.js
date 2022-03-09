import React, { Component } from 'react';
import ItemService from '../services/ItemService';
import { withRouter } from 'react-router-dom';

import AuthService from "../services/AuthService";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

class AddItemComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            price: '',
            discounted: false,
            discountPercentage: '0',
            discountedPrice: '',
            inputType: "hidden",
            labelType: "hidden",
            message: "",
            successful: false,
        }

        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changeDiscountHandler = this.changeDiscountHandler.bind(this);
        this.changeDiscountPercentageHandler = this.changeDiscountPercentageHandler.bind(this);
        this.saveItem = this.saveItem.bind(this);
        this.hiddenHandler = this.hiddenHandler.bind(this);

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
            this.setState({ discountPercentage: "1"});
        } else {
            this.setState({ inputType: "hidden" });
            this.setState({ labelType: "hidden" });
            this.setState({ discountPercentage: "0"});
        }
    }

    changeDiscountPercentageHandler = (event) => {
        this.setState({ discountPercentage: event.target.value });
    }

    saveItem = (e) => {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        const total = this.state.price - ((this.state.discountPercentage / 100) * this.state.price);

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            let item = {
                name: this.state.name,
                price: this.state.price,
                discounted: this.state.discounted,
                discountPercentage: this.state.discountPercentage,
                discountedPrice: total
            };

            ItemService.addItem(item).then(
                response => {
                    this.setState({
                        message: "Add Item Successful",
                        successful: true
                    });
                },
                error => {
                    const resMessage =
                        "Add Item Failed"

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }

    cancel = (e) => {
        e.preventDefault();
        this.props.history.push("/list");
    }

    render() {
        return (
            <div className="col-md-12" style={{ marginTop: "0px" }}>
                <div style={{ marginTop: "15px" }} className="card card-container">
                    <h4 className="card-title text-center">ADD ITEM</h4>
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
                                    <button className="btn btn-success" onClick={this.saveItem}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel} style={{ marginLeft: "10px" }}>Cancel</button>
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
                </div>
            </div>
        );
    }
}

export default withRouter(AddItemComponent);