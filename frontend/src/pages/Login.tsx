import React from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import "../css/form.css";
import Input from "../components/Input";
import Button from "../components/Button";

type Token = {
  token: string;
};

const Login = () => {
  const [status, setStatus] = React.useState(false);
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let payload: Object;
    // eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(login)) {
      payload = {
        email: login,
        password: password,
      };
    } else {
      payload = {
        username: login,
        password: password,
      };
    }

    const url = "http://localhost:3001/auth/login";

    axios
      .post<Token>(url, payload)
      .then((response) => {
        localStorage.setItem("user", response.data.token);
        return setStatus(true);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  if (status || localStorage.getItem("user")) {
    return <Redirect to="/" />;
  }
  return (
    <div className="parent">
      <form onSubmit={handleSubmit} className="form-login">
        <h3>Login</h3>
        <div>
          <Input
            type="text"
            label="Login"
            onChange={({ target }) => {
              setLogin(target.value);
            }}
            placeholder="Username or Email"
          />
        </div>
        <div>
          <Input
            type="password"
            label="Password"
            onChange={({ target }) => {
              setPassword(target.value);
            }}
            placeholder="Password"
          />
        </div>
        <Button type="submit" title="Login" />
        <div className="cont">
          <Link to="/register" className="link">
            Or Create An Account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
