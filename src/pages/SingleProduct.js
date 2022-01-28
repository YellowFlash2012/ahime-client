import { Card, Col, Image, ListGroup, ListGroupItem, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Rating from "../components/Rating";
import products from "../products";

const SingleProduct = () => {

    let { id } = useParams();
    console.log({id});

    const product = products.find((p) => p._id === id);

    return (
        <div>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>

            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                    {/* fluid prevents the img from going beyond its container */}
                </Col>

                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h2>{product.name}</h2>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Rating
                                value={product.rating}
                                text={`${product.numReviews}`}
                                reviews
                            />
                        </ListGroupItem>

                        <ListGroupItem>Price: ${product.price}</ListGroupItem>

                        <ListGroupItem>
                            Description: {product.description}
                        </ListGroupItem>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <Row>
                                    <Col>Price:</Col>

                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Status:</Col>

                                    <Col>
                                        {product.countInStock > 0 ? "In stock" : "Out of stock"}
                                    </Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Button
                                    className="btn-block"
                                    type="button"
                                    disabled={product.countInStock === 0}
                                >
                                    Add To Cart
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Row></Row>
        </div>
    );
};

export default SingleProduct;
