import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";

const Register = () => {
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
  };
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
      </form>
    </React.Fragment>
  );
};

export default Register;
