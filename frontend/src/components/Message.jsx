import { Alert } from "react-bootstrap";

const Message = ({ variant, children }) => {
  return (
    <Alert variant={variant || "info"} dismissible>
      {children}
    </Alert>
  );
};

export default Message;
