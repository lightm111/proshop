import { Carousel, Image } from "react-bootstrap";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const TopProducts = () => {
  const { data: products, isLoading } = useGetTopProductsQuery();

  const captionStyle = {
    background: "rgba(0,0,0,0.4)",
    margin: 0,
    left: 0,
    right: 0,
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Carousel className="my-3" style={{ width: "80%" }}>
      {products.map((p) => (
        <Carousel.Item key={p._id} style={{ background: "#777" }}>
          <Link to={`/product/${p._id}`}>
            <Image src={p.image} alt={p.name} fluid />
            <Carousel.Caption style={captionStyle}>
              <h3>
                {p.name} <span>(${p.price})</span>
              </h3>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
export default TopProducts;
