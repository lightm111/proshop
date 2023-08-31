import { useGetAllOrdersQuery } from "../../slices/ordersApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Table, Button } from "react-bootstrap";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const OrdersListScreen = () => {
  const { data: orders, isLoading, isError, error } = useGetAllOrdersQuery();
  const navigate = useNavigate();

  return (
    <div>
      <h1>All orders</h1>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{error.data?.message || error.error}</Message>
      ) : (
        <Table striped responsive hover className="text-center">
          <thead>
            <tr>
              <th>USER - ID</th>
              <th>ORDER ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {orders.map((order, index) => (
              <tr key={index}>
                <td>
                  {order.user.name} - {order.user._id}
                </td>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    <>
                      {order.paidAt.substring(0, 10)}{" "}
                      <FaCheck style={{ color: "green" }} />
                    </>
                  ) : (
                    <FaXmark style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <>
                      {order.deliveredAt.substring(0, 10)}{" "}
                      <FaCheck style={{ color: "green" }} />
                    </>
                  ) : (
                    <FaXmark style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate(`/order/${order._id}`)}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};
export default OrdersListScreen;
