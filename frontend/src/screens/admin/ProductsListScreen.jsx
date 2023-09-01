import { Row, Col, Button, Table } from "react-bootstrap";
import { FaPlus, FaPenToSquare, FaTrash } from "react-icons/fa6";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../slices/productsApiSlice";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const ProductsListScreen = () => {
  const { data: products, refetch, isLoading } = useGetProductsQuery();

  const navigate = useNavigate();

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const deleteHandler = async (p) => {
    try {
      const consent = window.confirm(`--> ${p.name} <--\nDelete this product?`);
      if (consent) {
        await deleteProduct({ productId: p._id }).unwrap();
        toast.success("Product deleted");
        refetch();
      }
    } catch (error) {
      toast.error(error.data?.message || error);
    }
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <h1>All Products</h1>
        </Col>
        <Col md={4}>
          <Button
            variant="primary"
            onClick={() => navigate("/admin/products/add")}
          >
            <FaPlus /> Add Product
          </Button>
        </Col>
      </Row>
      <Table striped borderless responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>CATEGORY</th>
            <th>PRICE</th>
            <th>COUNT</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {isLoading || isDeleting ? (
            <Loader />
          ) : (
            products.map((p, index) => (
              <tr key={index}>
                <td>{p._id}</td>
                <td>
                  <Link to={`/product/${p._id}`}>{p.name}</Link>
                </td>
                <td>{p.category}</td>
                <td>${p.price}</td>
                <td>{p.countInStock}</td>
                <td className="d-flex justify-content-evenly">
                  <Button
                    variant="secondary"
                    onClick={() => navigate(`/admin/products/edit/${p._id}`)}
                  >
                    <FaPenToSquare /> Edit
                  </Button>
                  <Button variant="danger" onClick={() => deleteHandler(p)}>
                    <FaTrash /> Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
};
export default ProductsListScreen;
