import { Alert } from "react-bootstrap";

const Message = ({ variant, dismissible, children }) => {
  return (
    <Alert
      variant={variant || "info"}
      dismissible={dismissible || false}
      className="my-2"
    >
      {children}
    </Alert>
  );
};

export default Message;
