import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import {
  FaCartShopping,
  FaArrowRightToBracket,
  FaArrowRightFromBracket,
  FaShop,
  FaUser,
} from "react-icons/fa6";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const logoutHandler = (e) => {};

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand>
              <FaShop /> UShop
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
                  <FaCartShopping /> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id="usernav"
                  className="dropstart"
                >
                  <NavDropdown.Header>{userInfo.email}</NavDropdown.Header>
                  <LinkContainer to={"/profile"}>
                    <NavDropdown.Item>
                      <FaUser /> Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    <FaArrowRightFromBracket /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaArrowRightToBracket /> Sign in
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
