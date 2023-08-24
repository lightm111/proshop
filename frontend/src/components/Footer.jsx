import { Container, Row, Col } from "react-bootstrap";

import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <Row className="text-center pt-3 pb-1" style={{ color: "#777" }}>
          <Col>UShop &copy; {currentYear} </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
