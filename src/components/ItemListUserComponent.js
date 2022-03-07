import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ItemService from '../services/ItemService';
import { BiCheckCircle, BiXCircle } from "react-icons/bi";
import { BsFillCartPlusFill } from "react-icons/bs";
import CartComponent from './CartComponent';

class ItemListAdminComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [],
            cartItems: []
        }

        this.onAdd = this.onAdd.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    componentDidMount() {
        ItemService.getItem().then((res) => {
            this.setState({ items: res.data });
        });
    }

    discountedChecker(item) {
        if (item == true) {
            return <BiCheckCircle />
        } else {
            return <BiXCircle />
        }
    }

    onAdd = (item) => {
        const exist = this.state.cartItems.find((x) => x.itemId === item.itemId);
        if (exist) {
            this.setState({
                cartItems:
                    this.state.cartItems.map((x) =>
                        x.itemId === item.itemId ? { ...exist, qty: exist.qty + 1 } : x
                    )
            });
        } else {
            this.setState({ cartItems: [...this.state.cartItems, { ...item, qty: 1 }] });
        }
        console.log("cart:" + JSON.stringify(this.state.cartItems));
    }

    onRemove = (item) => {
        const exist = this.state.cartItems.find((x) => x.itemId === item.itemId);
        if (exist.qty === 1) {
            this.setState({
                cartItems:
                    this.state.cartItems.filter((x) => x.itemId !== item.itemId)
            });
        } else {
            this.setState({
                cartItems:
                    this.state.cartItems.map((x) =>
                        x.itemId === item.itemId ? { ...exist, qty: exist.qty - 1 } : x
                    )
            });
        }
        console.log("cart:" + JSON.stringify(this.state.cartItems));
    }

    render() {
        return (
            <div>
                <div>
                    <h2 className="text-center">ITEM LIST</h2>
                </div><br />
                <div className="row table-responsive">
                    <table style={{ width: "70%", marginBottom:"0px"}} className="table table-hover text-center table-light">
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
                                                <button onClick={() => this.onAdd(item)} className="btn btn-secondary"><BsFillCartPlusFill /></button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <CartComponent onAdd={this.onAdd} onRemove={this.onRemove} cartItems={this.state.cartItems} />
                </div>
            </div>
        );
    }
}

export default withRouter(ItemListAdminComponent);
