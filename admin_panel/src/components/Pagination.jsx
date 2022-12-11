import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage, resetPagination } from "../store/pagination/action";

function Pagination({ data }) {
  const { page, limit, paginationNumsCount } = useSelector(
    (state) => state.paginationData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // if current page doesn't have results back to previous pages
    if (data.results <= 0 && page > 1) {
      const previousPage = page - 1 > 1 ? page - 1 : 1;
      dispatch(changePage(previousPage));
    }
  }, [data, page]);

  useEffect(() => {
    // Reset Pagination data after going from the current page
    return () => {
      dispatch(resetPagination());
    };
  }, []);

  const renderPagesNumber = () => {
    const totalPages = Math.ceil(data.total / limit);
    const numbers = [];

    for (let i = 1; i <= totalPages; i++) {
      numbers[i] = (
        <li
          key={i}
          className={`page-item ${i == page && "active"}`}
          aria-current={i == page && "page"}
        >
          <button className="page-link" onClick={() => dispatch(changePage(i))}>
            {i}
          </button>
        </li>
      );
    }

    if (numbers.length <= paginationNumsCount) {
      return numbers;
    }

    // Limit only 3 numbers in pagination
    return numbers.slice(page, page + paginationNumsCount);
  };

  return (
    <nav aria-label="..." className="d-flex justify-content-center mt-2">
      <ul className="pagination">
        <li className={`page-item ${page <= 1 && "disabled"}`}>
          <a
            className="page-link"
            onClick={() => dispatch(changePage(page > 1 ? page - 1 : page))}
          >
            Previous
          </a>
        </li>
        {data.data && renderPagesNumber()}

        <li
          className={`page-item ${
            page >= Math.ceil(data.total / limit) && "disabled"
          }`}
        >
          <a
            className="page-link"
            onClick={() =>
              dispatch(
                changePage(
                  page < Math.ceil(data.total / limit) ? page + 1 : page
                )
              )
            }
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
