import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      className="loader"
      animation="border"
      variant="info"
      role="status"
    />
  );
};

export default Loader;
