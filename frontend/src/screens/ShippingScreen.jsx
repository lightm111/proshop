import { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const { shippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    if (shippingAddress) {
      setAddress(shippingAddress.address);
      setPostalCode(shippingAddress.postalCode);
      setCity(shippingAddress.city);
      setCountry(shippingAddress.country);
    }
  }, [shippingAddress, setAddress, setPostalCode, setCity, setCountry]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(saveShippingAddress({ address, postalCode, city, country }));
    navigate("/payment");
  };

  return (
    <>
      <CheckoutSteps step2 />
      <FormContainer title={"Shipping address"}>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formAddress" className="mb-3">
            <Form.Label>Address:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the address"
              value={address}
              required
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="formPostalcode" className="mb-3">
            <Form.Label>Postal code:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the postal code or zip code"
              value={postalCode}
              required
              onChange={(e) => {
                setPostalCode(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="formCity" className="mb-3">
            <Form.Label>City:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the city"
              value={city}
              required
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="formCountry" className="mb-3">
            <Form.Label>Country:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the country"
              value={country}
              required
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
