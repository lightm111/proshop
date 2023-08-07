import { Navbar, Nav, Form, Container, Badge } from "react-bootstrap";
import { FaCartShopping, FaKey, FaShop } from "react-icons/fa6";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand>
              <FaShop />
              UShop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbar-collapse-id" />
          <Navbar.Collapse id="navbar-collapse-id">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  {cartItems.length > 0 && (
                    <Badge pill bg="info">
                      {cartItems.reduce((acc, e) => acc + e.qty, 0)}
                    </Badge>
                  )}
                  <FaCartShopping />
                  Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaKey />
                  Sign in
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Form inline>
              <Form.Control
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
