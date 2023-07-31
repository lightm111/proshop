import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Image, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Rating from "../components/Rating";

const ProductScreen = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`, {
        baseURL: "http://localhost:3001",
      });
      setProduct(data);
    };
    fetchProduct();
  }, [id]);
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
