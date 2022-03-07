import React, { Component } from "react";
import AuthService from "../services/AuthService";
import RegisterUserComponent from './RegisterUserComponent';
import RegisterAdminComponent from './RegisterAdminComponent';

export default class RegisterComponent extends Component {
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
          {currentUser.roles == "ROLE_ADMIN" ?
            <RegisterUserComponent />
            : ""
          }
          {currentUser.roles == "ROLE_SUPER_ADMIN" ?
            <RegisterAdminComponent />
            : ""
          }
      </div>
    );
  }
}