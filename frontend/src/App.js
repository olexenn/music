import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";

function App() {
    return (
        <BrowserRouter>
            <CssBaseline />
            <Container>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/main" element={<Main />} />
                    <Route
                        path="/login"
                        element={
                            localStorage.getItem("user") ? (
                                <Navigate to="/main" replace />
                            ) : (
                                <Login />
                            )
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            localStorage.getItem("user") ? (
                                <Navigate to="/main" replace />
                            ) : (
                                <Register />
                            )
                        }
                    />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;
