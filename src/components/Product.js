import { Card } from "react-bootstrap";

const Product = ({ product }) => {
    // since {product} is what we are receiving from the props, destructuring from the get go prevents using {props.product} later on in the return()
    return (
        <div>
            <Card className="my-3 p-3 rounded">
                <a href={`/product/product._id`}>
                    <Card.Img src={product.image} variant="top" />
                </a>

                <Card.Body>
                    <a href={`/product/product._id`}>
                        <Card.Title as="div">
                            <strong>{product.name}</strong>
                        </Card.Title>
                    </a>

                    <Card.Text as="div">
                        <div className="my-3">
                            {product.rating} from {product.numReviews} reviews
                        </div>
                    </Card.Text>

                    <Card.Text as="h3">£{product.price}</Card.Text>

                </Card.Body>
            </Card>
        </div>
    );
};

export default Product;
