import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useNavigate, useSearchParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import SearchBox from "../components/SearchBox";
import TopProducts from "../components/TopProducts";

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
      {page === 1 && !keyword && <TopProducts />}
      <Row>
        <Col md={8}>
          <h1>Latest Products</h1>
        </Col>
        <Col md={4}>
          <SearchBox url={"/"} />
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{error.data?.message || error.error}</Message>
      ) : (
        <>
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
