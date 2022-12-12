import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlusSquare, FaPen, FaTrashAlt } from "react-icons/fa";
import Pagination from "../components/Pagination";
import { fetchUsers } from "../store/users/actions";
import parseQueries from "../helpers/parseQueries";
import { resetFilter, sortFilter } from "../store/filter/actions";
import beautifulDate from "../helpers/beautifulDate";
import BeautifulSelect from "../components/BeautifulSelect";
import MainFilters from "../components/MainFilters";
import { Link } from "react-router-dom";
import { showDeleteModal } from "../store/modals/delete/action";
import DeleteModal from "../components/modals/DeleteModal";

const Users = (props) => {
  // Data
  const users = useSelector((state) => state.users);
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
      resourceName: "users",
      itemName,
      fetchResourceAction: fetchUsers,
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
    dispatch(fetchUsers(queries));
  }, [paginationData, mainFilterData, filterData, dispatch]);

  /**
   *
   * @param {number} status
   * @returns JSX ELEMENT
   */
  const renderUserStatus = (status) => {
    if (status === 1) {
      return <span className="bdg bdg-success">Active</span>;
    } else if (status === 2) {
      return <span className="bdg bdg-warning">Disabled</span>;
    } else if (status === 3) {
      return <span className="bdg bdg-danger">Banned</span>;
    }
  };

  /**
   * No params
   * @returns JSX ELEMENTS
   */
  const renderUsers = () => {
    return users.data.map((user, index) => (
      <tr key={user.id}>
        <th scope="row">{index + 1}</th>
        <td>
          <img src={`/storage/users/${user.photo}`} alt="username" />
        </td>
        <td>{user.fullName}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{renderUserStatus(user.status)}</td>
        <td>{user.role.toUpperCase()}</td>
        <td>{beautifulDate(user.createdAt)}</td>
        <td>
          <Link to="/users/edit" className="btn btn-sm btn-success me-1">
            <FaPen className="me-1" />
            Edit
          </Link>

          <button
            onClick={() => handleDelete(user)}
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
    <div className="main-content users-page">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="page-head">Users</h1>

        <div className="actions">
          <Link
            to="/users/create"
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

        {/* Role Filter */}
        <BeautifulSelect
          label={{ text: "Role", for: "role" }}
          id="role"
          className="form-control"
          onChange={(e) =>
            setFilterData({ ...filterData, role: e.target.value })
          }
          value={filterData.role}
        >
          <option value="">All</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </BeautifulSelect>

        {/* Status Filter */}
        <BeautifulSelect
          label={{ text: "Status", for: "status" }}
          id="status"
          onChange={(e) =>
            setFilterData({ ...filterData, status: e.target.value })
          }
          value={filterData.status}
        >
          <option value="">All</option>
          <option value="1">Active</option>
          <option value="2">Disabled</option>
          <option value="3">Banned</option>
        </BeautifulSelect>
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
                <th scope="col">Photo</th>
                <th
                  scope="col"
                  onClick={() => dispatch(sortFilter("firstName"))}
                  className={
                    mainFilterData.sort === "firstName" ? "active" : ""
                  }
                >
                  Name
                </th>
                <th
                  scope="col"
                  onClick={() => dispatch(sortFilter("username"))}
                  className={mainFilterData.sort === "username" ? "active" : ""}
                >
                  Username
                </th>
                <th
                  scope="col"
                  onClick={() => dispatch(sortFilter("email"))}
                  className={mainFilterData.sort === "email" ? "active" : ""}
                >
                  Email
                </th>
                <th
                  scope="col"
                  onClick={() => dispatch(sortFilter("phone"))}
                  className={mainFilterData.sort === "phone" ? "active" : ""}
                >
                  Phone
                </th>
                <th
                  scope="col"
                  onClick={() => dispatch(sortFilter("status"))}
                  className={mainFilterData.sort === "status" ? "active" : ""}
                >
                  Status
                </th>
                <th
                  scope="col"
                  onClick={() => dispatch(sortFilter("role"))}
                  className={mainFilterData.sort === "role" ? "active" : ""}
                >
                  Role
                </th>
                <th
                  scope="col"
                  onClick={() => dispatch(sortFilter("createdAt"))}
                  className={
                    mainFilterData.sort === "createdAt" ? "active" : ""
                  }
                >
                  Joined In
                </th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>{users.data && renderUsers()}</tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal />

      {/* Pagination */}
      <Pagination data={users} />
    </div>
  );
};

export default Users;
