import React,{useEffect,useState} from 'react';
import {
    Button,
    Col,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Link, useParams } from "react-router-dom";

import FormContainer from "../components/FormContainer";
import { listProduct } from "../actions/productActions";
import Message from "../components/Message";
import Loader from '../components/Loader'

const ProductEditByAdmin = () => {
    const productId = useParams();

    const location = useLocation();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setcountInStock] = useState(0);
    const [description, setDescription] = useState("");


    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;


    useEffect(() => {
        
            if (!product.name || product._id !==productId) {
                dispatch(listProduct(productId));
            } else {
                setName(product.name);
                setPrice(product.price);
                setDescription(product.description);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setcountInStock(product.setcountInStock);
            }
        }, [dispatch, productId, navigate]);

    const updateSubmitHandler = (e) => {
        e.preventDefault();
        
    };

    return (
        <div>
            <Link to="/admin/products" className="btn btn-light my-3">
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit product</h1>

                {/* {loadingUpdate && <Loader />}
                {errorUpdate && (
                    <Message variant="danger">{errorUpdate}</Message>
                )} */}

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={updateSubmitHandler}>
                        <Form.Group controlId="name">
                            <FormLabel>Product name</FormLabel>

                            <FormControl
                                type="text"
                                placeholder="Enter product name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></FormControl>
                        </Form.Group>

                        <Form.Group controlId="price">
                            <FormLabel className="mt-2">
                                Price
                            </FormLabel>

                            <FormControl
                                type="number"
                                placeholder="Set a price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></FormControl>
                        </Form.Group>
                        
                                <Form.Group controlId="image">
                            <FormLabel className="mt-2">
                                Image
                            </FormLabel>

                            <FormControl
                                type="text"
                                placeholder="Enter an image URL"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></FormControl>
                        </Form.Group>
                                
                                <Form.Group controlId="description">
                            <FormLabel className="mt-2">
                                Description
                            </FormLabel>

                            <FormControl
                                type="text"
                                placeholder="Enter product description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></FormControl>
                        </Form.Group>
                                
                                <Form.Group controlId="brand">
                            <FormLabel className="mt-2">
                                Brand
                            </FormLabel>

                            <FormControl
                                type="text"
                                placeholder="Enter product brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></FormControl>
                                </Form.Group>
                                
                                <Form.Group controlId="category">
                            <FormLabel className="mt-2">
                                Category
                            </FormLabel>

                            <FormControl
                                type="text"
                                placeholder="Enter product cetagory"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></FormControl>
                                </Form.Group>
                                
                                <Form.Group controlId="countInTsock">
                            <FormLabel className="mt-2">
                                Count in Stock
                            </FormLabel>

                            <FormControl
                                type="number"
                                placeholder="set qty in stock"
                                value={countInStock}
                                onChange={(e) => setcountInStock(e.target.value)}
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
                )}
            </FormContainer>
        </div>
    );
};

export default ProductEditByAdmin;
