import React from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import List from "./pages/List";
import AddItem from "./pages/AddItem";
import Bills from "./pages/Bills";

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
            <Route path="/add-item" component={AddItem} />
            <Route path="/bills" component={Bills} />
          </Switch>
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */ }
      </div>
    );
}

export default App;