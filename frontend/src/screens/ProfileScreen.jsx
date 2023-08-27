import { useState } from "react";
import { Col, Row, Form, Button, InputGroup, Table } from "react-bootstrap";
import { FaEye, FaEyeSlash, FaCheck, FaXmark } from "react-icons/fa6";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [updateProfile, { isLoading: isLoadingProfile }] =
    useUpdateProfileMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile({ name, email, password }).unwrap();
      dispatch(setCredentials(res));
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error.data?.message || error.error);
      console.log(error);
    }
  };

  const { data: myOrders, isLoading, isError, error } = useGetMyOrdersQuery();

  return (
    <Row>
      <Col md={3}>
        <h1>User Info</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              required
              disabled={isLoadingProfile}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="youremail@example.com"
              name="email"
              value={email}
              required
              disabled={isLoadingProfile}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password:</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="passsword"
                value={password}
                required
                disabled={isLoadingProfile}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
          </Form.Group>
          <Button variant="success" type="submit" disabled={isLoadingProfile}>
            Save
          </Button>
          {isLoadingProfile && <Loader />}
        </Form>
      </Col>
      <Col md={9}>
        <h1>My Orders</h1>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant="danger">
            {error.data?.message || error.error}
          </Message>
        ) : (
          <Table striped responsive hover className="text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {myOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <>
                        {order.paidAt.substring(0, 10)}{" "}
                        <FaCheck style={{ color: "green" }} />
                      </>
                    ) : (
                      <FaXmark style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <>
                        {order.deliveredAt.substring(0, 10)}{" "}
                        <FaCheck style={{ color: "green" }} />
                      </>
                    ) : (
                      <FaXmark style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate(`/order/${order._id}`)}
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};
export default ProfileScreen;
