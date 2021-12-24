import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import axios from "axios";
import Input from "../components/Input";

export default function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (confirmPassword !== password) {
            setError("Passwords Do Not Match");
            return;
        } else if (
            password.trim() === "" ||
            email.trim() === "" ||
            username.trim() === ""
        ) {
            setError("Input All Fields");
            return;
        } else if (
            /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(email) === false
        ) {
            setError("Email Is Invalid");
            return;
        }

        const apiUrl = "http://localhost:3001/auth/register";
        const payload = {
            email: email,
            username: username,
            password: password,
        };

        console.log(payload);

        try {
            const response = await axios.post(apiUrl, payload);
            localStorage.setItem("user", response.data.accessToken);
            setEmail("");
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            setError("");
        } catch (e) {
            console.log(e);
            setError("User with this username or email already exists");
        }
    };
    return (
        <Box sx={{ mt: 5 }}>
            <form onSubmit={handleSubmit}>
                {error.length > 0 ? (
                    <div>
                        <Input
                            error
                            helperText={error}
                            onChange={({ target }) => {
                                setEmail(target.value);
                            }}
                            variant="outlined"
                            label="Email"
                            name="email"
                            type="text"
                            autoFocus
                        />
                        <Input
                            error
                            helperText={error}
                            onChange={({ target }) => {
                                setUsername(target.value);
                            }}
                            variant="outlined"
                            label="Username"
                            name="username"
                            type="text"
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
                        <Input
                            error
                            helperText={error}
                            onChange={({ target }) => {
                                setConfirmPassword(target.value);
                            }}
                            variant="outlined"
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                        />
                    </div>
                ) : (
                    <div>
                        <Input
                            onChange={({ target }) => {
                                setEmail(target.value);
                            }}
                            variant="outlined"
                            label="Email"
                            name="email"
                            type="text"
                            autoFocus
                        />
                        <Input
                            onChange={({ target }) => {
                                setUsername(target.value);
                            }}
                            variant="outlined"
                            label="Username"
                            name="username"
                            type="text"
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
                        <Input
                            onChange={({ target }) => {
                                setConfirmPassword(target.value);
                            }}
                            variant="outlined"
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                        />
                    </div>
                )}
                <Button size="large" type="submit" variant="contained">
                    Register
                </Button>
            </form>
        </Box>
    );
}
