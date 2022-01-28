import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";

import { Counter } from "./features/counter/Counter";
import Home from "./pages/Home";
import SingleProduct from "./pages/SingleProduct";

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
                        </Routes>
                    </Container>
                </main>

                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
