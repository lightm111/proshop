import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Button,
  Row,
  Col,
  Image,
  ListGroup,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import {
  useGetProductDetailsQuery,
  useDeleteProductMutation,
} from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductDetailsQuery({ productId });

  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addToCartHandler = async () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const { userInfo } = useSelector((state) => state.auth);

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const deleteHandler = async (p) => {
    try {
      const consent = window.confirm(`--> ${p.name} <--\nDelete this product?`);
      if (consent) {
        await deleteProduct({ productId: p._id });
        toast.success("Product deleted");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.data?.message || error);
    }
  };

  return (
    <>
      {isLoading || isDeleting ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          Error! {error.status} - {error.error}
        </Message>
      ) : (
        <div>
          <Row className="justify-content-center mb-3">
            <Col md={4}>
              <Image src={product.image} fluid />
            </Col>

            <Col md={4}>
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

            <Col sm={"auto"}>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>${product.price}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0
                            ? `in stock (${product.countInStock})`
                            : "Out of stock"}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Quantity:</Col>
                          <Col>
                            <Form.Select
                              size="sm"
                              value={qty}
                              onChange={(ev) => setQty(Number(ev.target.value))}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (i) => (
                                  <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                  </option>
                                )
                              )}
                            </Form.Select>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
                <Button
                  variant="primary"
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </Button>
              </Card>
            </Col>
          </Row>
          <Button variant="dark" onClick={() => navigate("/")}>
            Back
          </Button>

          {userInfo && userInfo.isAdmin && (
            <>
              <Button
                className="ms-3"
                variant="secondary"
                onClick={() => navigate(`/admin/products/edit/${product._id}`)}
              >
                Edit this product
              </Button>
              <Button
                className="ms-3"
                variant="danger"
                onClick={() => deleteHandler(product)}
              >
                Delete this product
              </Button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ProductScreen;
