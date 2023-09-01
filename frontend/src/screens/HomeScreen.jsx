import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useNavigate, useSearchParams } from "react-router-dom";
import Paginate from "../components/Paginate";

const HomeScreen = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";

  const { data, isLoading, isError, error } = useGetProductsQuery({
    keyword,
    page,
  });

  const navigate = useNavigate();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          Error! {error.status} - {error.error}
        </Message>
      ) : (
        <>
          <h1>Latest products</h1>
          <Row className="justify-content-center">
            {data.products.map((product) => (
              <Col key={product._id} sm={10} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            page={data.page}
            pages={data.pages}
            handlePage={(p) => navigate(`/?page=${p}`)}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
