import React from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import Input from "../components/Input";
import Button from "../components/Button";

type Token = {
  token: string;
};

const Register = () => {
  const [status, setStatus] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirm !== password) {
      alert("Passwords do not match");
      return;
    }

    const url = "http://localhost:3001/auth/register";
    const payload = {
      email: email,
      username: username,
      password: password,
    };

    axios
      .post<Token>(url, payload)
      .then((response) => {
        console.log(response);
        localStorage.setItem("user", response.data.token);
        return setStatus(true);
      })
      .catch((err: Error) => {
        console.error(err);
      });
  };

  if (status || localStorage.getItem("user")) {
    return <Redirect to="/" />;
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <h3>Register</h3>
        <Input
          type="text"
          label="Username"
          placeholder="Username"
          onChange={({ target }) => {
            setUsername(target.value);
          }}
        />
        <Input
          type="text"
          label="Email"
          placeholder="Email"
          onChange={({ target }) => {
            setEmail(target.value);
          }}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          onChange={({ target }) => {
            setPassword(target.value);
          }}
        />
        <Input
          type="password"
          label="Confirm Password"
          placeholder="Confirm your password"
          onChange={({ target }) => {
            setConfirm(target.value);
          }}
        />
        <Button type="submit" title="Register" />
        <div className="cont">
          <Link to="/login" className="link">
            Or If You Have An Account LogIn
          </Link>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Register;
