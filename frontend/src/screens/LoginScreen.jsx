import { Form, Button, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import CheckoutSteps from "../components/CheckoutSteps";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
    } catch (error) {
      console.log(error);
      toast.error(error.data?.message || error.error);
    }
  };

  return (
    <>
      {redirectTo === "/shipping" && <CheckoutSteps step1 />}
      <FormContainer title={"Sign in"}>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formEmail" className="mb-3">
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
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password:</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="passsword"
                value={password}
                required
                disabled={isLoading}
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
          <Button variant="primary" type="submit" disabled={isLoading}>
            Login
          </Button>
          {isLoading && <Loader />}
          <Form.Text as="p" className="mt-3 mb-2" style={{ fontSize: "1rem" }}>
            New user?{" "}
            <Link to={`/register?redirect=${redirectTo}`}>Register here</Link>
          </Form.Text>
        </Form>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
