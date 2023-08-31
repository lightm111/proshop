import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
} from "../slices/ordersApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  ListGroup,
  Row,
  Col,
  // Button,
  Card,
  Image,
  Badge,
  Button,
} from "react-bootstrap";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    isError,
    error,
  } = useGetOrderDetailsQuery(orderId);

  // PayPal Payment
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const [payOrder, { isLoading: isPaying }] = usePayOrderMutation();
  const {
    data: paypal,
    isLoading: isPayPalLoading,
    error: paypalError,
  } = useGetPayPalClientIdQuery();

  useEffect(() => {
    if (!isPayPalLoading && !paypalError && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: { clientId: paypal.clientId, currency: "USD" },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid && !window.paypal) {
        loadPayPalScript();
      }
    }
  }, [isPayPalLoading, paypalError, paypal, paypalDispatch, order]);

  // PayPal Button handlers
  const onApprove = (data, actions) =>
    actions.order.capture().then(async (details) => {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment success");
      } catch (error) {
        toast.error(error.data?.message || error.error);
      }
    });
  // const onApproveTest = async () => {
  //   try {
  //     await payOrder({ orderId, details: { payer: {} } });
  //     refetch();
  //     toast.success("Payment success");
  //   } catch (error) {
  //     toast.error(error.data?.message || error.error);
  //   }
  // };
  const onError = (error) => {
    toast.error(error.message);
  };
  const createOrder = (data, actions) =>
    actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderId) => orderId);

  // Delivery
  const { userInfo } = useSelector((state) => state.auth);
  const [deliverOrder, { isLoading: isDeliverLoading, error: deliverError }] =
    useDeliverOrderMutation();
  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId).unwrap();
      refetch();
      toast.success("Marked as Delivered");
    } catch (error) {
      toast.error(error.data?.message || error.error);
    }
  };

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message variant="danger">{error.data?.message || error.error}</Message>
  ) : (
    <>
      {/* TODO: Change the default order id set my mongo */}
      <h1>Order #{order._id}</h1>
      {order.isPaid && (
        <Badge pill bg="primary">
          Paid
        </Badge>
      )}
      {order.isDelivered && (
        <Badge pill bg="success">
          Delivered
        </Badge>
      )}

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <ul>
                <li>
                  <strong>Name:</strong> {order.user.name}
                </li>
                <li>
                  <strong>Email:</strong> {order.user.email}
                </li>
                <li>
                  <strong>Address:</strong> {order.shippingAddress.address},{" "}
                  {order.shippingAddress.city}{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </li>
                {!order.isDelivered ? (
                  <Message variant="danger">Not delivered yet</Message>
                ) : (
                  <li>
                    <strong>Delivered at: </strong>
                    {order.deliveredAt}
                  </li>
                )}
              </ul>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment</h2>
              <ul>
                <li>
                  <strong>Method:</strong> {order.paymentMethod}
                </li>
                {!order.isPaid ? (
                  <Message variant="danger">Not paid yet</Message>
                ) : (
                  <li>
                    <strong>Paid at: </strong>
                    {order.paidAt}
                  </li>
                )}
              </ul>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Items</h2>
              <ListGroup variant="flush">
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={6}>
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ${item.price} = $
                        {Math.round(item.qty * item.price * 100) / 100}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card style={{ width: "18em" }}>
            <Card.Header>
              <Card.Title className="text-center pt-2">
                Order summary
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col md={5}>Items</Col>
                    <Col md={5}>${order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={5}>Shipping</Col>
                    <Col md={5}>${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={5}>Tax</Col>
                    <Col md={5}>${order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={5}>
                      <strong>Total</strong>
                    </Col>
                    <Col md={5}>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
            <Card.Footer>
              {!order.isPaid && (
                <>
                  {isPaying && <Loader />}

                  {isPending ? (
                    <Loader />
                  ) : (
                    <>
                      {/* <Button
                        variant="primary"
                        className="mb-2"
                        onClick={onApproveTest}
                      >
                        Test on Approve
                      </Button> */}
                      <PayPalButtons
                        onApprove={onApprove}
                        onError={onError}
                        createOrder={createOrder}
                      />
                    </>
                  )}
                </>
              )}

              {!userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered &&
              isDeliverLoading ? (
                <Loader />
              ) : deliverError ? (
                <Message variant="danger">
                  {deliverError.data?.message || deliverError.error}
                </Message>
              ) : (
                <Button
                  variant="info"
                  className="my-2"
                  onClick={deliverHandler}
                >
                  Mark as Delivered
                </Button>
              )}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
