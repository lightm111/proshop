import { Navbar, Nav, Form, Container } from "react-bootstrap";
import { FaShop } from "react-icons/fa6";
import { LinkContainer } from "react-router-bootstrap";

import React from "react";

const Header = () => {
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
              <LinkContainer to="/features">
                <Nav.Link>Features</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/pricing">
                <Nav.Link>Pricing</Nav.Link>
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
