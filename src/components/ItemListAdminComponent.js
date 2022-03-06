import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ItemService from '../services/ItemService';
import { BiEdit, BiTrash, BiCheckCircle, BiXCircle} from "react-icons/bi";
import { MdAddShoppingCart } from "react-icons/md";

class ItemListAdminComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items : []
        }
        this.addItem = this.addItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

    }

    componentDidMount() {
        ItemService.getItem().then((res) => {
            this.setState({ items: res.data});
        });
    }

    addItem() {  
        this.props.history.push("/add-item");
    }
 
    updateItem(itemId) {
        this.props.history.push(`/update-item/${itemId}`);
    }

    deleteItem(itemId) {
        ItemService.deleteItem(itemId).then( res => {
            this.setState({items: this.state.items.filter(item => item.itemId !== itemId)});
        })
    }

    discountedChecker(item)  {
        if(item == true) {
            return <BiCheckCircle/>
        } else {
            return <BiXCircle/>
        }
    }

    render() {
        return (
            <div>
                <div>
                <h2 className="text-center">ITEM LIST</h2>
                <button className="btn btn-secondary" onClick={this.addItem}><MdAddShoppingCart/> Add Item</button>
                </div><br/>
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
                                    <tr key = {item.itemId}>
                                        <td>{item.itemId}</td>
                                        <td>{item.name}</td>
                                        <td>&#8369;{item.price}</td>
                                        <td>&#8369;{item.discountedPrice}</td>
                                        <td>{this.discountedChecker(item.isDiscounted)}</td>
                                        <td>{item.discountPercentage}%</td>
                                        <td>
                                            <button onClick={ () => this.updateItem(item.itemId)} className="btn btn-secondary"><BiEdit/></button>
                                            <button style={{marginLeft: "15px"}} onClick={ () => this.deleteItem(item.itemId)} className="btn btn-secondary"><BiTrash/></button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default withRouter(ItemListAdminComponent);
