import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaSistrix } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const SearchBox = ({ url }) => {
  const [keyword, setKeyword] = useState();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`${url}?keyword=${keyword.trim()}`);
    } else {
      navigate(url);
    }
  };

  return (
    <Form onSubmit={submitHandler} className="px-md-5">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="search here"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button type="sybmit" variant="dark">
          <FaSistrix />
        </Button>
      </InputGroup>
    </Form>
  );
};
export default SearchBox;
