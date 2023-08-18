import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress } = useSelector((state) => state.cart);
  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(savePaymentMethod(paymentMethod));
    navigate("/place-order");
  };

  return (
    <>
      <CheckoutSteps step3 />
      <FormContainer title={"Payment"}>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Select payment method:</Form.Label>
            <Form.Check
              className="mb-2"
              type="radio"
              label="PayPal"
              id="PayPal"
              name="paymentMethod"
              value={"PayPal"}
              onClick={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              className="my-2"
              type="radio"
              label="BitCoin"
              id="BitCoin"
              name="paymentMethod"
              value={"BitCoin"}
              onClick={(e) => setPaymentMethod(e.target.value)}
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

export default PaymentScreen;
