import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ItemService from '../services/ItemService';
import { BiCheckCircle, BiXCircle} from "react-icons/bi";
import { RiFileList2Line } from "react-icons/ri";
import { BsFillCartPlusFill } from "react-icons/bs";

class ItemListAdminComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items : []
        }
    }

    componentDidMount() {
        ItemService.getItem().then((res) => {
            this.setState({ items: res.data});
        });
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
                <button className="btn btn-secondary" onClick={this.addItem}><RiFileList2Line /> Generate Bill</button>
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
                                            <button onClick="" className="btn btn-secondary"><BsFillCartPlusFill/></button>
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
