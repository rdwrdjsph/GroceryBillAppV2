import React, { Component } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import ProfileComponent from '../components/ProfileComponent';

class Profile extends Component {
    render() {
        return (
            <div>
                <HeaderComponent />
                <div className="container">
                    <ProfileComponent />
                </div>
            </div>
        );
    }
}

export default Profile;