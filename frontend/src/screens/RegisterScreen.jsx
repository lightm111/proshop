import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
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
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials(res));
    } catch (error) {
      console.log(error);
      toast.error(error.data?.message || error.error);
    }
  };

  return (
    <FormContainer title={"Register"}>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            required
            disabled={isLoading}
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
            disabled={isLoading}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mb-3">
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
        <Button variant="info" type="submit" disabled={isLoading}>
          Register
        </Button>
        {isLoading && <Loader />}
        <p>
          Already an user?{" "}
          <Link to={`/login?redirect=${redirectTo}`}>login here</Link>
        </p>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
