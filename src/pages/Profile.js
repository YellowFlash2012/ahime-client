import React, { useEffect, useState } from "react";
import {
    Button,
    Col,
    Form,
    FormControl,
    FormLabel,
    Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import FormContainer from "../components/FormContainer";
import { getUserDetails } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const Profile = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [msg, setMsg] = useState(null);

    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            navigate("/login");
        } else {
            if (!user.name) {
                dispatch(getUserDetails("profile"));
            } else {
                // to prefill these fields upon load
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [navigate, userInfo, dispatch, user.name, user.email]);

    const profileSubmitHandler = (e) => {
        e.preventDefault();

        if (password !== confPassword) {
            setMsg("Passwords do not match");
        } else {
            setMsg(null);
            dispatch(userDetails(name, email, password));
        }
    };

    return (
        <div>
            <Row>
                <Col md={3}>
                    <h2>User Profile</h2>

                    {/* passwords don't match message */}
                    {msg && <Message variant="danger">{msg}</Message>}

                    {/* other messages related to the signup form */}
                    {error && <Message variant="danger">{error}</Message>}

                    {loading && <Loader />}

                    <Form onSubmit={profileSubmitHandler}>
                        <Form.Group controlId="name">
                            <FormLabel>Full name</FormLabel>

                            <FormControl
                                type="text"
                                placeholder="Enter full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></FormControl>
                        </Form.Group>

                        <Form.Group controlId="email">
                            <FormLabel>Email address</FormLabel>

                            <FormControl
                                type="email"
                                placeholder="Enter email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></FormControl>
                        </Form.Group>

                        <Form.Group controlId="password">
                            <FormLabel>Password</FormLabel>

                            <FormControl
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></FormControl>
                        </Form.Group>

                        <Form.Group controlId="confPassword">
                            <FormLabel>Confirm Password</FormLabel>

                            <FormControl
                                type="password"
                                placeholder="Confirm password"
                                value={confPassword}
                                onChange={(e) =>
                                    setConfPassword(e.target.value)
                                }
                            ></FormControl>
                        </Form.Group>

                        <Button
                            type="submit"
                            className="mt-2"
                            variant="primary"
                        >
                            Update
                        </Button>
                    </Form>
                </Col>

                <Col md={9}>
                    <h2>My Orders</h2>
                </Col>
            </Row>
        </div>
    );
};

export default Profile;
