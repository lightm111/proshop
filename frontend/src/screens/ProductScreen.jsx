import { useParams } from "react-router-dom";
import products from "../products";
import { Card, Button, Row, Col, Image, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Rating from "../components/Rating";

const ProductScreen = () => {
  const { id } = useParams();
  const product = products.find((p) => p._id === id);
  console.log(product);
  return (
    <div>
      <Row>
        <Col sm={3}>
          <Image src={product.image} fluid />
        </Col>
        <Col sm={3}>
          <Card className="border-light">
            <Card.Title className="ps-2">{product.name}</Card.Title>
            <Card.Header>by {product.brand}</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Rating:{" "}
                  <Rating value={product.rating} num={product.numReviews} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Card.Text>{product.description}</Card.Text>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={3} xl={2}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>{product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0
                        ? `${product.countInStock} availables`
                        : "Out of stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
            <LinkContainer to="/add-to-cart">
              <Button variant="primary" disabled={product.countInStock === 0}>
                Add to Cart
              </Button>
            </LinkContainer>
          </Card>
        </Col>
      </Row>
      <LinkContainer to="/">
        <Button variant="dark">Back</Button>
      </LinkContainer>
    </div>
  );
};

export default ProductScreen;
