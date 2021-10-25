import React from "react";
import "../css/form.css";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(login, password);
  };
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
        {/* <button type="submit">Login</button> */}
        <Button type="submit" title="Login" />
      </form>
    </div>
  );
};

export default Login;
