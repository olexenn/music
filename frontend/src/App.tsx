import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import "./css/app.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return localStorage.getItem("user") ? (
                <Home />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
