import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlusSquare, FaPen, FaTrashAlt } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import parseQueries from "../../helpers/parseQueries";
import { resetFilter, sortFilter } from "../../store/filter/actions";
import beautifulDate from "../../helpers/beautifulDate";
import BeautifulSelect from "../../components/BeautifulSelect";
import MainFilters from "../../components/MainFilters";
import { Link } from "react-router-dom";
import { showDeleteModal } from "../../store/modals/delete/action";
import DeleteModal from "../../components/modals/DeleteModal";
import { fetchCategories } from "../../store/categories/actions";

const Categories = (props) => {
  // Data
  const categories = useSelector((state) => state.categories);

  // Dispatch
  const dispatch = useDispatch();
  // Pagination State
  const paginationData = useSelector((state) => state.paginationData);
  // Main Filter State [sort, sort_order, search...]
  const mainFilterData = useSelector((state) => state.mainFilterData);
  // Filter State
  const [filterData, setFilterData] = useState({
    role: "user",
    status: 1,
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
      resourceName: "categories",
      itemName,
      fetchResourceAction: fetchCategories,
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
    dispatch(fetchCategories(queries));
  }, [paginationData, mainFilterData, filterData, dispatch]);

  /**
   * No params
   * @returns JSX ELEMENTS
   */
  const renderCategories = () => {
    return categories.data.map((category, index) => (
      <tr key={category._id}>
        <th scope="row">{index + 1}</th>
        <td>
          <img
            src={`${process.env.REACT_APP_STORAGE_URL}/categories/${category.cover}`}
            alt="category"
          />
        </td>
        <td>{category.title}</td>
        <td>{category?.description || "No description"}</td>
        <td>{category.createdBy.username}</td>
        <td>{beautifulDate(category.createdAt)}</td>
        <td>
          <Link
            to={`/categories/edit/${category._id}`}
            className="btn btn-sm btn-success me-1"
          >
            <FaPen className="me-1" />
            Edit
          </Link>

          <button
            onClick={() => handleDelete(category)}
            className="btn btn-sm btn-danger me-1"
          >
            <FaTrashAlt className="me-1" />
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="main-content categories-page">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="page-head">Categories</h1>

        <div className="actions">
          <Link
            to="/categories/create"
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
                <th scope="col">Cover</th>
                <th
                  scope="col"
                  onClick={() => dispatch(sortFilter("title"))}
                  className={mainFilterData.sort === "title" ? "active" : ""}
                >
                  Title
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
            <tbody>{categories?.data && renderCategories()}</tbody>
          </table>

          {categories?.data?.length === 0 && <p className="fw-bold">No Data</p>}
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal />

      {/* Pagination */}
      <Pagination data={categories} />
    </div>
  );
};

export default Categories;
