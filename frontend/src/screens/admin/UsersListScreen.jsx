import { Button, Table } from "react-bootstrap";
import { FaPenToSquare, FaTrash, FaXmark, FaCheck } from "react-icons/fa6";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../slices/usersApiSlice";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UsersListScreen = () => {
  const { data: users, refetch, isLoading } = useGetUsersQuery();

  const navigate = useNavigate();

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const deleteHandler = async (u) => {
    try {
      const consent = window.confirm(`--> ${u.name} <--\nDelete this user?`);
      if (consent) {
        await deleteUser({ userId: u._id }).unwrap();
        toast.success("User deleted");
        refetch();
      }
    } catch (error) {
      toast.error(error.data?.message || error);
    }
  };

  return (
    <>
      <h1>All Users</h1>
      <Table striped borderless responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {isLoading || isDeleting ? (
            <Loader />
          ) : (
            users.map((u, index) => (
              <tr key={index}>
                <td>{u._id}</td>
                <td>{u.name}</td>
                <td>
                  <a href={`mailto:${u.email}`}>{u.email}</a>
                </td>
                <td>
                  {u.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaXmark style={{ color: "red" }} />
                  )}
                </td>
                <td className="d-flex justify-content-evenly">
                  <Button
                    variant="secondary"
                    onClick={() => navigate(`/admin/users/edit/${u._id}`)}
                  >
                    <FaPenToSquare /> Edit
                  </Button>
                  <Button variant="danger" onClick={() => deleteHandler(u)}>
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
export default UsersListScreen;
