import { Button, Form, InputGroup } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import { useState } from "react";
import {
  useAddProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProductScreen = () => {
  // TODO: Add validation
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState("");

  const [addProduct, { isLoading, error }] = useAddProductMutation();
  const [upload, { isLoading: isUploading, error: uploadError }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  const uploadHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    const res = await upload(formData).unwrap();
    setImage(res.image);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await addProduct({
        name,
        price,
        category,
        brand,
        description,
        image,
        countInStock,
      }).unwrap();
      navigate(`/product/${res._id}`);
    } catch (error) {
      console.log(error);
      toast.error(error.data?.message || error.error);
    }
  };

  return (
    <FormContainer title="Add a Product">
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Product name</Form.Label>
          <Form.Control
            type="text"
            placeholder="iPhone 15"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <InputGroup>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="number"
              placeholder="999.99"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="electronic"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="Apple"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as={"textarea"}
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Text as={"p"}>Path: {image}</Form.Text>
          <Form.Control
            type="file"
            name="image"
            accept=".jpg,.jpeg,.png"
            onChange={uploadHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Count in stock</Form.Label>
          <Form.Control
            type="number"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
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
            Add to stock
          </Button>
        )}
      </Form>
    </FormContainer>
  );
};

export default AddProductScreen;
