import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import UserService from '../services/UserService';

class ClerkListComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            clerks: []
        }
    }

    componentDidMount() {
        UserService.getAllClerk().then((res) => {
            this.setState({ clerks: res.data });
        });
    }

    roleChecker(role) {
        if (role == '[{"id":3,"name":"ROLE_USER"}]') {
            return "USER";
        } else if (role == '[{"id":2,"name":"ROLE_ADMIN"}]') {
            return "ADMIN";
        } else if (role == '[{"id":1,"name":"ROLE_SUPER_ADMIN"}]') {
            return "SUPER ADMIN";
        } else {
            return "ROLE NOT FOUND";
        }
    }

    render() {
        return (
            <div>
                <div>
                    <h2 className="text-center">CLERK LIST</h2>
                </div><br />
                <div className="row table-responsive">
                    <table className="table table-hover text-center table-light">
                        <thead className="table-dark">
                            <tr>
                                <th>Clerk ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Contact Number</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.clerks.map(
                                    clerk =>
                                        <tr key={clerk.id}>
                                            <td>{clerk.id}</td>
                                            <td>{clerk.username}</td>
                                            <td>{clerk.email}</td>
                                            <td>{clerk.firstName} {clerk.lastName}</td>
                                            <td>{clerk.gender}</td>
                                            <td>{clerk.contactNumber}</td>
                                            <td>{this.roleChecker(JSON.stringify(clerk.roles))}</td>
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

export default withRouter(ClerkListComponent);
