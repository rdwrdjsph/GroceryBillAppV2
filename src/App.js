import React from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import List from "./pages/List";
import BoardUser from "./components/BoardUserComponent";
import BoardAdmin from "./components/BoardAdminComponent";
import BoardSuperAdmin from "./components/BoardSuperAdminComponent";
import AddItem from "./pages/AddItem";
import UpdateItem from "./pages/UpdateItem";
import Receipt from "./pages/Receipt";

// import AuthVerify from "./common/auth-verify";

function App() {
    return (
      <div>
        <div>
          <Switch>
            <Route exact path={["/", "/login"]} component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/list" component={List} />
            <Route path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/sadmin" component={BoardSuperAdmin} />
            <Route path="/add-item" component={AddItem} />
            <Route path="/update-item/:id" component={UpdateItem} />
            <Route path="/receipt" component={Receipt} />
          </Switch>
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */ }
      </div>
    );
}

export default App;