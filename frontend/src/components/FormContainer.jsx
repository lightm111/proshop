import { Card } from "react-bootstrap";

const FormContainer = ({ title, children }) => {
  return (
    <div>
      <Card style={{ width: "18rem" }} className="shadow mx-auto my-3">
        <Card.Header>{title}</Card.Header>
        <Card.Body>{children}</Card.Body>
      </Card>
    </div>
  );
};

export default FormContainer;
