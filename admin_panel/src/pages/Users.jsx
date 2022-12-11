import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/Pagination";
import {
  changeLimit,
  changePaginationNumsCount,
} from "../store/pagination/action";
import { fetchUsers } from "../store/users/actions";
import parseQueries from "../helpers/parseQueries";
import {
  resetFilter,
  searchFilter,
  sortFilter,
  sortOrderFilter,
} from "../store/filter/actions";
import beautifulDate from "../helpers/beautifulDate";
import BeautifulInput from "../components/BeautifulInput";
import BeautifulSelect from "../components/BeautifulSelect";

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
    dispatch(fetchUsers(parseQueries(queriesObject)));
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
          <img
            src={`http://localhost:8000/storage/users/${user.photo}`}
            alt="username"
          />
        </td>
        <td>{user.fullName}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{renderUserStatus(user.status)}</td>
        <td>{user.role.toUpperCase()}</td>
        <td>{beautifulDate(user.createdAt)}</td>
        <td>
          <a href="/" className="btn btn-sm btn-success me-1">
            Edit
          </a>
          <a href="/" className="btn btn-sm btn-danger me-1">
            Delete
          </a>
        </td>
      </tr>
    ));
  };

  return (
    <div className="main-content users-page">
      <h1 className="page-head">Users</h1>

      {/* Filter */}
      <div className="table-filter row">
        <div className="col-xl-4">
          <BeautifulInput
            label={{ text: "Search", for: "search" }}
            className="test"
            id="search"
            type="text"
            placeholder="Search by name, username, email..."
            value={mainFilterData.search}
            onChange={(e) => dispatch(searchFilter(e.target.value))}
          />
        </div>

        {/* Order by ( ASC || DESC ) */}
        <div className="col-xl-4 mb-2">
          <BeautifulSelect
            label={{ text: "Order By", for: "sortOrder" }}
            id="sortOrder"
            onChange={(e) => dispatch(sortOrderFilter(e.target.value))}
            value={mainFilterData.order}
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </BeautifulSelect>
        </div>

        <div className="col-xl-4 mb-2">
          <div className="w-100">
            <label htmlFor="limitFields">Limit Fields</label>
            <select
              id="limitFields"
              className="form-control"
              onChange={(e) => dispatch(changeLimit(+e.target.value))}
              value={paginationData.limit}
            >
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>

        <div className="col-xl-4 mb-2">
          <div className="w-100">
            <label htmlFor="paginationNumsCount">Pagination Numbers</label>
            <select
              id="paginationNumsCount"
              className="form-control"
              onChange={(e) =>
                dispatch(changePaginationNumsCount(+e.target.value))
              }
              value={paginationData.paginationNumsCount}
            >
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>
        </div>

        <div className="col-xl-4 mb-2">
          <div className="w-100">
            <label htmlFor="role">Role</label>
            <select
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
            </select>
          </div>
        </div>

        <div className="col-xl-4 mb-2">
          <div className="w-100">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              className="form-control"
              onChange={(e) =>
                setFilterData({ ...filterData, status: e.target.value })
              }
              value={filterData.status}
            >
              <option value="">All</option>
              <option value="1">Active</option>
              <option value="2">Disabled</option>
              <option value="3">Banned</option>
            </select>
          </div>
        </div>
      </div>

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

      {/* Pagination */}
      <Pagination data={users} />
    </div>
  );
};

export default Users;
