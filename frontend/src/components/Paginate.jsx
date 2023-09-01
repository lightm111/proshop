import { Pagination } from "react-bootstrap";

const Paginate = ({ page, pages, handlePage }) => {
  return pages > 1 ? (
    <Pagination className="justify-content-center my-2">
      <Pagination.First
        onClick={() => handlePage(1)}
        disabled={Number(page) === 1}
      />
      <Pagination.Prev
        onClick={() => handlePage(Number(page) - 1)}
        disabled={Number(page) === 1}
      />
      {[...Array(pages).keys()].map((k) => (
        <Pagination.Item
          onClick={() => handlePage(k + 1)}
          key={k + 1}
          active={Number(page) === k + 1}
        >
          {k + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => handlePage(Number(page) + 1)}
        disabled={Number(page) === Number(pages)}
      />
      <Pagination.Last
        onClick={() => handlePage(pages)}
        disabled={Number(page) === Number(pages)}
      />
    </Pagination>
  ) : (
    <></>
  );
};
export default Paginate;
