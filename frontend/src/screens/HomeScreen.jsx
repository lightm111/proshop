import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const { data: products, isLoading, isError, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          Error! {error.status} - {error.error}
        </Message>
      ) : (
        <div>
          <h1>Latest products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={10} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </>
  );
};

export default HomeScreen;
