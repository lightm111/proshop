import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirectTo = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirectTo);
    }
  }, [redirectTo, userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      navigate(redirectTo);
    } catch (error) {
      console.log(error);
      toast.error(error.data?.message || error.error);
    }
  };

  return (
    <FormContainer title={"Login"}>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="formBasicEmail" className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="youremail@example.com"
            name="email"
            value={email}
            required
            disabled={isLoading}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="passsword"
            value={password}
            required
            disabled={isLoading}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
          Login
        </Button>
        {isLoading && <Loader />}
        <p>
          New user?{" "}
          <Link to={`/register?redirect=${redirectTo}`}>Register here</Link>
        </p>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
