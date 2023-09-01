import { Link, useNavigate, useParams } from "react-router-dom";
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
  useCreateProductReviewMutation,
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
    refetch,
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
  // Review
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const [creteReview, { isLoading: isReviewLoading }] =
    useCreateProductReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await creteReview({ productId, data: { rating, comment } }).unwrap();
      refetch();
      toast.success("Thanks for your review");
    } catch (error) {
      toast.error(error.data?.message || error.error);
    }
  };

  return (
    <>
      <Button variant="dark" onClick={() => navigate(-1)}>
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
      {isLoading || isDeleting ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          Error! {error.status} - {error.error}
        </Message>
      ) : (
        <div>
          <Row className="justify-content-center my-3">
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
          <Row>
            <Col md={5}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 ? (
                <Message variant="secondary">No reviews yet</Message>
              ) : (
                product.reviews.map((r, index) => (
                  <Card key={index} className="mb-2">
                    <Card.Header className="d-flex justify-content-between">
                      <Rating value={product.rating} />
                      <span>
                        by {r.user.name} on {r.createdAt.substring(0, 10)}
                      </span>
                    </Card.Header>
                    <Card.Body>{r.comment}</Card.Body>
                  </Card>
                ))
              )}
              <Form onSubmit={submitHandler}>
                <h3>Leave a review</h3>
                {userInfo ? (
                  <>
                    <Form.Group>
                      <Form.Label>Rating</Form.Label>
                      <Form.Range
                        min={1}
                        max={5}
                        step={1}
                        onChange={(e) => setRating(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as={"textarea"}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </Form.Group>
                    <Button
                      type="submit"
                      variant="primary"
                      className="my-3"
                      disabled={isReviewLoading}
                    >
                      Submit
                    </Button>
                    {isReviewLoading && <Loader />}
                  </>
                ) : (
                  <Message variant="secondary">
                    <Link to={`/login?redirect=/product/${productId}`}>
                      Sign in
                    </Link>{" "}
                    to write a review
                  </Message>
                )}
              </Form>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
