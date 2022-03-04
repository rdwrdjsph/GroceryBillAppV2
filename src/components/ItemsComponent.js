import React, { Component } from "react";
import AuthService from "../services/AuthService";
import ItemListAdminComponent from './ItemListAdminComponent';
import ItemListUserComponent from './ItemListUserComponent';

export default class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }
  render() {
    const { currentUser } = this.state;
    return (
      <div>
          {currentUser.roles == "ROLE_USER" ?
            <ItemListUserComponent />
            : <ItemListAdminComponent />
          }
      </div>
    );
  }
}