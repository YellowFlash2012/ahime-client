import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Col,
    Image,
    ListGroup,
    ListGroupItem,
    Row,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { deliverOrder, getOrderDetails, payOrder } from "../actions/orderActions";
import Loader from "../components/Loader.js";

import Message from "../components/Message";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from "../constants/orderConstants";

const OrderDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let id = useParams();

    const [sdkReady, setSdkReady] = useState(false);

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    // state related to payment by paypal
    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    // related to delivery
    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

    // related to user logged in
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {

        if (!userInfo) {
            navigate('/login')
        }
        const addPaypalScript = async () => {
            const { data: clientId } = await axios.get("/api/config/paypal");

            const script = document.createElement("script");

            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}"`;

            script.async = true;

            script.onload = () => {
                setSdkReady(true);
            };

            document.body.appendChild(script);
        };

        if (!order || successPay || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });

            dispatch(getOrderDetails(id));
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPaypalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [dispatch, order, id, successPay, successDeliver]);

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        dispatch(payOrder(id, paymentResult))
    };

    const deliverHandler = () => {
        dispatch(deliverOrder(order));
    }

    return (
        <div>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <h1>Order {order._id}</h1>{" "}
                    <Row>
                        <Col md={8}>
                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name: </strong>
                                        {order.user.name}
                                    </p>

                                    <p>
                                        <strong>Email: </strong>{" "}
                                        <a href={`mailto:${order.user.email}`}>
                                            {order.user.email}
                                        </a>
                                    </p>

                                    <p>
                                        <strong>Address: </strong>
                                        {order.shippingAddress.address},{" "}
                                        {order.shippingAddress.city},{" "}
                                        {order.shippingAddress.postalCode},{" "}
                                        {order.shippingAddress.country}
                                    </p>

                                    {order.isDelivered ? (
                                        <Message variant="success">
                                            Delivered on {order.deliveredAt}
                                        </Message>
                                    ) : (
                                        <Message variant="danger">
                                            Not delivered
                                        </Message>
                                    )}
                                </ListGroupItem>

                                <ListGroupItem>
                                    <h2>Payment Method</h2>
                                    <p>
                                        <strong>Method: </strong>
                                        {order.paymentMethod}
                                    </p>
                                    {order.isPaid ? (
                                        <Message variant="success">
                                            Paid on {order.paidAt}
                                        </Message>
                                    ) : (
                                        <Message variant="danger">
                                            Not paid
                                        </Message>
                                    )}
                                </ListGroupItem>

                                <ListGroupItem>
                                    <h2>Order Items</h2>
                                    {order.orderItems.length === 0 ? (
                                        <Message>
                                            No order. Go{" "}
                                            <Link to="/">here</Link>to place
                                            one.
                                        </Message>
                                    ) : (
                                        <ListGroup variant="flush">
                                            {order.orderItems.map(
                                                (item, index) => (
                                                    <ListGroupItem key={index}>
                                                        <Row>
                                                            <Col md={1}>
                                                                <Image
                                                                    src={
                                                                        item.image
                                                                    }
                                                                    alt={
                                                                        item.name
                                                                    }
                                                                    fluid
                                                                    rounded
                                                                />
                                                            </Col>

                                                            <Col>
                                                                <Link
                                                                    to={`/product/${item.product}`}
                                                                >
                                                                    {item.name}
                                                                </Link>
                                                            </Col>

                                                            <Col md={4}>
                                                                {item.qty} x $
                                                                {item.price} = $
                                                                {item.qty *
                                                                    item.price}
                                                            </Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                )
                                            )}
                                        </ListGroup>
                                    )}
                                </ListGroupItem>
                            </ListGroup>
                        </Col>

                        <Col md={4}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroupItem>
                                        <h2>Order Summary</h2>
                                    </ListGroupItem>

                                    <ListGroupItem>
                                        <Row>
                                            <Col>Items</Col>

                                            <Col>${order.itemsPrice}</Col>
                                        </Row>
                                    </ListGroupItem>

                                    <ListGroupItem>
                                        <Row>
                                            <Col>Shipping</Col>

                                            <Col>${order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroupItem>

                                    <ListGroupItem>
                                        <Row>
                                            <Col>Tax</Col>

                                            <Col>${order.taxAmount}</Col>
                                        </Row>
                                    </ListGroupItem>

                                    <ListGroupItem>
                                        <Row>
                                            <Col>Total</Col>

                                            <Col>${order.totalAmount}</Col>
                                        </Row>
                                    </ListGroupItem>

                                    {!order.isPaid && (
                                        <ListGroupItem>
                                            {loadingPay && <Loader />}

                                            {!sdkReady ? (
                                                <Loader />
                                            ) : (
                                                <PayPalButton
                                                    amount={order.totalAmount}
                                                    onSuccess={
                                                        successPaymentHandler
                                                    }
                                                />
                                            )}
                                        </ListGroupItem>
                                    )}

                                    {/* <ListGroupItem>
                                        <Button
                                            type="button"
                                            className="btn-block"
                                        >
                                            Place Order
                                        </Button>
                                    </ListGroupItem> */}
                                            
                                            {loadingDeliver && <Loader />}
                                            {userInfo &&
                                                userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                                    <ListGroupItem>
                                                        <Button type="button" className="btn btn-block" onClick={deliverHandler}>
                                                            Mark as Delivered
                                                        </Button>
                                                    </ListGroupItem>
                                                )
                                            }
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    );
};

export default OrderDetails;
