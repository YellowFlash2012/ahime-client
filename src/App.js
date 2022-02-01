import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";

import { Counter } from "./features/counter/Counter";
import Home from "./pages/Home";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Header />

                <main className="py-3">
                    <Container>
                        <Routes>
                            <Route path="/" element={<Home />} />

                            <Route
                                path="/product/:id"
                                element={<SingleProduct />}
                            />

                            {/* 2 routes are needed to fully render the cart */}
                            <Route
                                // path="/cart/:id?" is no longer supported under RRDV6
                                path="/cart/:id"
                                element={<Cart />}
                            />
                            <Route
                                // path="/cart/:id?" is no longer supported under RRDV6
                                path="/cart"
                                element={<Cart />}
                            />

                            <Route path="/login" element={<Login />} />

                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </Container>
                </main>

                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
