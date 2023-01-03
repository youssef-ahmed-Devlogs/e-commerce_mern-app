import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlusSquare, FaPen, FaTrashAlt } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import parseQueries from "../../helpers/parseQueries";
import { resetFilter, sortFilter } from "../../store/filter/actions";
import beautifulDate from "../../helpers/beautifulDate";
import MainFilters from "../../components/MainFilters";
import { Link } from "react-router-dom";
import { showDeleteModal } from "../../store/modals/delete/action";
import DeleteModal from "../../components/modals/DeleteModal";
import { fetchProducts } from "../../store/products/actions";

const Products = (props) => {
  // Data
  const products = useSelector((state) => state.products);

  // Dispatch
  const dispatch = useDispatch();
  // Pagination State
  const paginationData = useSelector((state) => state.paginationData);
  // Main Filter State [sort, sort_order, search...]
  const mainFilterData = useSelector((state) => state.mainFilterData);
  // Filter State
  const [filterData, setFilterData] = useState({
    category: 123123123,
  });

  // resource is like (user, product, category) data.
  const handleDelete = (resource) => {
    const itemName =
      resource.title ||
      resource.name ||
      resource.fullName ||
      resource.username ||
      "item";
    const deleteModalData = {
      id: resource._id,
      resourceName: "products",
      itemName,
      fetchResourceAction: fetchProducts,
    };
    dispatch(showDeleteModal(deleteModalData));
  };

  useEffect(() => {
    // Reset main filter data after going from the current page
    return () => {
      dispatch(resetFilter());
    };
  }, [dispatch]);

  // Fetch Data
  useEffect(() => {
    const queriesObject = {
      ...paginationData,
      ...mainFilterData,
      ...filterData,
    };

    /**
     * Fetch data from the api based on:
     * - pagination
     * - filter
     */
    const queries = parseQueries(queriesObject);
    dispatch(fetchProducts(queries));
  }, [paginationData, mainFilterData, filterData, dispatch]);

  const renderProductsCategories = (product) => {
    if (product.categories.length) {
      return product.categories.map((cat, i) =>
        product.categories.length > i + 1 ? `${cat.title}, ` : cat.title
      );
    }

    return "Not in category";
  };

  /**
   * No params
   * @returns JSX ELEMENTS
   */
  const renderProducts = () => {
    return products.data.map((product, index) => {
      return (
        <tr key={product._id}>
          <th scope="row">{index + 1}</th>
          <td>
            <img
              src={`${process.env.REACT_APP_STORAGE_URL}/products/${product?.images[0]}`}
              alt="product"
            />
          </td>
          <td>{product.title}</td>
          <td>${product.price}</td>
          <td>{product?.description || "No description"}</td>
          <td>{renderProductsCategories(product)}</td>
          <td>{product.createdBy.username}</td>
          <td>{beautifulDate(product.createdAt)}</td>
          <td>
            <Link
              to={`/products/edit/${product._id}`}
              className="btn btn-sm btn-success me-1"
            >
              <FaPen className="me-1" />
              Edit
            </Link>

            <button
              onClick={() => handleDelete(product)}
              className="btn btn-sm btn-danger me-1"
            >
              <FaTrashAlt className="me-1" />
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="main-content products-page">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="page-head">Products</h1>

        <div className="actions">
          <Link
            to="/products/create"
            className="btn btn-primary d-flex align-items-center gap-2"
          >
            <FaPlusSquare />
            Create
          </Link>
        </div>
      </div>

      {/* Main Filter */}
      <MainFilters className="mb-2">
        {/* ========== additional filters ============= */}
      </MainFilters>

      <div className="card card-table">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th
                  scope="col"
                  onClick={() => dispatch(sortFilter("_id"))}
                  className={mainFilterData.sort === "_id" ? "active" : ""}
                >
                  #
                </th>
                <th scope="col">Image</th>
                <th
                  scope="col"
                  onClick={() => dispatch(sortFilter("title"))}
                  className={mainFilterData.sort === "title" ? "active" : ""}
                >
                  Title
                </th>
                <th
                  scope="col"
                  onClick={() => dispatch(sortFilter("price"))}
                  className={mainFilterData.sort === "price" ? "active" : ""}
                >
                  Price
                </th>
                <th
                  scope="col"
                  onClick={() => dispatch(sortFilter("description"))}
                  className={
                    mainFilterData.sort === "description" ? "active" : ""
                  }
                >
                  Description
                </th>
                <th
                  scope="col"
                  onClick={() => dispatch(sortFilter("categories"))}
                  className={
                    mainFilterData.sort === "categories" ? "active" : ""
                  }
                >
                  Categories
                </th>
                <th
                  scope="col"
                  onClick={() => dispatch(sortFilter("createdBy"))}
                  className={
                    mainFilterData.sort === "createdBy" ? "active" : ""
                  }
                >
                  Created By
                </th>
                <th
                  scope="col"
                  onClick={() => dispatch(sortFilter("createdAt"))}
                  className={
                    mainFilterData.sort === "createdAt" ? "active" : ""
                  }
                >
                  Created At
                </th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>{products?.data && renderProducts()}</tbody>
          </table>

          {products?.data?.length === 0 && <p className="fw-bold">No Data</p>}
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal />

      {/* Pagination */}
      <Pagination data={products} />
    </div>
  );
};

export default Products;
