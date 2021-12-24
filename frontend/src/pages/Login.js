import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import Input from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.trim() === "" || login.trim() === "") {
      setError("Input All Fields");
      return;
    }

    const apiUrl = "http://localhost:3001/auth/login";
    let payload;
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
    console.log(payload);
    try {
      const response = await axios.post(apiUrl, payload);
      localStorage.setItem("user", response.data.accessToken);
      console.log(localStorage.getItem("user"));
      setLogin("");
      setPassword("");
      setError("");
    } catch (e) {
      console.log(e);
      setError("Creadentials Are Incorrect");
    }
    // setRedirect(true);
    // setTimeout(() => navigate("/"), 1000);
    navigate("/main");
  };

  //if (redirect) {
    //return <Navigate to="/register" />;
  //}

  return (
    <Box sx={{ mt: 5 }}>
      <form onSubmit={handleSubmit}>
        {error.length > 0 ? (
          <div>
            <Input
              error
              helperText={error}
              onChange={({ target }) => {
                setLogin(target.value);
              }}
              variant="outlined"
              label="Login"
              name="Login"
              type="text"
              autoFocus
            />
            <Input
              error
              helperText={error}
              onChange={({ target }) => {
                setPassword(target.value);
              }}
              variant="outlined"
              label="Password"
              name="password"
              type="password"
            />
          </div>
        ) : (
          <div>
            <Input
              onChange={({ target }) => {
                setLogin(target.value);
              }}
              variant="outlined"
              label="Login"
              name="login"
              type="text"
              autoFocus
            />
            <Input
              onChange={({ target }) => {
                setPassword(target.value);
              }}
              variant="outlined"
              label="Password"
              name="password"
              type="password"
            />
          </div>
        )}
        <Button size="large" type="submit" variant="contained">
          Login
        </Button>
        <Button onClick={() => navigate("/register")}>Register</Button>
      </form>
    </Box>
  );
}
