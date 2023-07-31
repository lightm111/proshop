import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="p-2 my-2">
      <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="text-nowrap">
            {product.name}
          </Card.Title>
        </Link>
        <Rating value={product.rating} num={product.numReviews} />
        <Card.Subtitle>${product.price}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default Product;
