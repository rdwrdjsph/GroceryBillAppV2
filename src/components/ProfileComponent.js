import React, { Component } from "react";
import AuthService from "../services/AuthService";
import avatarm from "../images/avatarm.png"
import avatarw from "../images/avatarw.png"

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
                <div style={{marginTop: "0px"}} className="col-md-12 text-center">
                        <div style={{marginTop: "15px"}} className="card card-container">
                            <h4 className="card-title"><strong>Clerk Profile</strong></h4>
                            <br/>
                            { currentUser.gender == "Male" ?
                            <img src={avatarm} alt="profile-img" className="profile-img-card"/> : "" }
                            { currentUser.gender == "Female" ?
                            <img src={avatarw} alt="profile-img" className="profile-img-card"/> : "" }
                            <p class="card-text"><strong>ID:</strong> {currentUser.id}</p>
                            <p class="card-text"><strong>Username:</strong> {currentUser.username}</p>
                            <p class="card-text"><strong>Email:</strong> {currentUser.email}</p>
                            <p class="card-text"><strong>Name:</strong> {currentUser.firstName} {currentUser.lastName}</p>
                            <p class="card-text"><strong>Gender :</strong> {currentUser.gender}</p>
                            <p class="card-text"><strong>Contact Number:</strong> {currentUser.contactNumber}</p>
                            <p class="card-text"><strong>Role:</strong> { currentUser.roles == "ROLE_USER" ? "USER" : ""}
                                                                        { currentUser.roles == "ROLE_ADMIN" ? "ADMIN" : ""}
                                                                        { currentUser.roles == "ROLE_SUPER_ADMIN" ? "SUPER ADMIN" : ""} </p>
                        </div>
                </div>
            </div>

        );
    }
}