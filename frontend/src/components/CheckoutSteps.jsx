import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="my-3 justify-content-center">
      <Nav.Link className={step1 && "current-step"} disabled>
        Sign in
      </Nav.Link>
      <LinkContainer to="/shipping">
        <Nav.Link className={step2 && "current-step"} disabled={step1 || step2}>
          Shipping
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to="/payment">
        <Nav.Link className={step3 && "current-step"} disabled={step1 || step3}>
          Payment
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to="/place-order">
        <Nav.Link className={step4 && "current-step"} disabled={step1 || step4}>
          Place order
        </Nav.Link>
      </LinkContainer>
    </Nav>
  );
};

export default CheckoutSteps;
