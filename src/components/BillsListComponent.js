import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import BillService from '../services/BillService';

class BillsListComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            bills : []
        }
    }

    componentDidMount() {
        BillService.getBills().then((res) => {
            this.setState({ bills: res.data});
        });
    }

    render() {
        return (
            <div>
                <div>
                <h2 className="text-center">BILLS LIST</h2>
                </div><br/>
                <div className="row table-responsive">
                    <table className="table table-hover text-center table-light">
                        <thead className="table-dark">
                            <tr>
                                <th>Transaction ID</th>
                                <th>Clerk On Duty</th>
                                <th>Regular Bill</th>
                                <th>Discounted Bill</th>
                                <th>Total Bill</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.bills.map(
                                    bill =>
                                    <tr key = {bill.transactionId}>
                                        <td>{bill.transactionId}</td>
                                        <td>{bill.clerkOnDuty}</td>
                                        <td>&#8369;{bill.regularPrice}</td>
                                        <td>&#8369;{bill.discountedPrice}</td>
                                        <td>&#8369;{bill.totalPrice}</td>
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

export default withRouter(BillsListComponent);
