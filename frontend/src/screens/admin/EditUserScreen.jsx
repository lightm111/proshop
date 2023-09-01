import { Button, Form } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import { useEffect, useState } from "react";
import {
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} from "../../slices/usersApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditUserScreen = () => {
  // TODO: Add validation
  const { id: userId } = useParams();
  const { data: user, isLoading: gettingUser } = useGetUserDetailsQuery({
    userId,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!gettingUser) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [gettingUser, user]);

  const [editUser, { isLoading, error }] = useUpdateUserMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await editUser({
        userId: userId,
        data: {
          name,
          email,
          isAdmin,
        },
      }).unwrap();
      toast.success("Update user success");
      navigate("/admin/users");
    } catch (error) {
      console.log(error);
      toast.error(error.data?.message || error.error);
    }
  };

  return (
    <FormContainer title="Edit an User">
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>User name</Form.Label>
          <Form.Control
            type="text"
            placeholder={name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder={email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            label="is an Admin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
        </Form.Group>

        {error && (
          <Message variant="danger" dismissible={true}>
            {error.data?.message || error.error}
          </Message>
        )}

        {isLoading ? (
          <Loader />
        ) : (
          <Button type="submit" disabled={isLoading}>
            Save
          </Button>
        )}
      </Form>
      <Button
        className="mt-3"
        variant="dark"
        onClick={() => navigate("/admin/users")}
      >
        Back
      </Button>
    </FormContainer>
  );
};

export default EditUserScreen;
