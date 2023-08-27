import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { useSelector } from "react-redux";

const Product = ({ product }) => {
  const { cartItems } = useSelector((state) => state.cart);
  let qty;
  if (cartItems) {
    const inCart = cartItems.find((i) => i._id === product._id);
    qty = inCart?.qty || null;
  }

  return (
    <Card className="p-2 my-2">
      <Link to={`/product/${product._id}`} className="position-relative">
        <Card.Img variant="top" src={product.image} />
        {qty && (
          <Badge
            pill
            bg="secondary"
            className="position-absolute top-0 start-50"
          >
            {qty}
          </Badge>
        )}
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
