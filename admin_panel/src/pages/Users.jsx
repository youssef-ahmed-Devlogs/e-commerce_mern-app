import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/users/actions";

const Users = (props) => {
  const users = useSelector((state) => state.users);
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [paginationNumbers, setPaginationNumbers] = useState(3);
  const [role, setRole] = useState("user");
  const [status, setStatus] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchUsers(
        `sort=${sort}&order=${order}&search=${search}&page=${page}&limit=${limit}${
          role && "&role=" + role
        }${status && "&status=" + status}`
      )
    );
  }, [sort, order, search, page, limit, role, status]);

  useEffect(() => {
    // if current page doesn't have results back to preview pages
    if (users.results <= 0) {
      const previewsPage = page - 1 > 1 ? page - 1 : 1;
      setPage(previewsPage);
    }
  }, [users]);

  const renderUserStatus = (status) => {
    if (status === 1) {
      return <span className="bdg bdg-success">Active</span>;
    } else if (status === 2) {
      return <span className="bdg bdg-warning">Disabled</span>;
    } else if (status === 3) {
      return <span className="bdg bdg-danger">Banned</span>;
    }
  };

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
        <td>
          {new Date(user.createdAt).toLocaleString("en-us", {
            year: "numeric",
            month: "long",
          })}
        </td>
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

  const renderPagesNumber = () => {
    const totalPages = Math.ceil(users.total / limit);
    const numbers = [];

    for (let i = 1; i <= totalPages; i++) {
      numbers[i] = (
        <li
          key={i}
          className={`page-item ${i == page && "active"}`}
          aria-current={i == page && "page"}
        >
          <button className="page-link" onClick={() => setPage(i)}>
            {i}
          </button>
        </li>
      );
    }
    // Limit only 3 numbers in pagination
    return numbers.slice(page, page + paginationNumbers);
  };

  return (
    <div className="main-content users-page">
      <h1 className="page-head">Users</h1>

      <div className="table-filter row">
        <div className="col-xl-4 mb-2">
          <div className="w-100">
            <label htmlFor="search">Search</label>
            <input
              id="search"
              type="text"
              placeholder="Search by name, username, email..."
              className="form-control"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="col-xl-4 mb-2">
          <div className="w-100">
            <label htmlFor="sortOrder">Order By</label>
            <select
              id="sortOrder"
              className="form-control"
              onChange={(e) => setOrder(e.target.value)}
              value={order}
            >
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </div>
        </div>

        <div className="col-xl-4 mb-2">
          {" "}
          <div className="w-100">
            <label htmlFor="limitFields">Limit Fields</label>
            <select
              id="limitFields"
              className="form-control"
              onChange={(e) => setLimit(e.target.value)}
              value={limit}
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
            <label htmlFor="paginationNumbers">Pagination Numbers</label>
            <select
              id="paginationNumbers"
              className="form-control"
              onChange={(e) => setPaginationNumbers(+e.target.value)}
              value={paginationNumbers}
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
              onChange={(e) => setRole(e.target.value)}
              value={role}
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
              onChange={(e) => setStatus(e.target.value)}
              value={status}
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
                  onClick={() => setSort("_id")}
                  className={sort === "_id" ? "active" : ""}
                >
                  #
                </th>
                <th scope="col">Photo</th>
                <th
                  scope="col"
                  onClick={() => setSort("firstName")}
                  className={sort === "firstName" ? "active" : ""}
                >
                  Name
                </th>
                <th
                  scope="col"
                  onClick={() => setSort("username")}
                  className={sort === "username" ? "active" : ""}
                >
                  Username
                </th>
                <th
                  scope="col"
                  onClick={() => setSort("email")}
                  className={sort === "email" ? "active" : ""}
                >
                  Email
                </th>
                <th
                  scope="col"
                  onClick={() => setSort("phone")}
                  className={sort === "phone" ? "active" : ""}
                >
                  Phone
                </th>
                <th
                  scope="col"
                  onClick={() => setSort("status")}
                  className={sort === "status" ? "active" : ""}
                >
                  Status
                </th>
                <th
                  scope="col"
                  onClick={() => setSort("role")}
                  className={sort === "role" ? "active" : ""}
                >
                  Role
                </th>
                <th
                  scope="col"
                  onClick={() => setSort("createdAt")}
                  className={sort === "createdAt" ? "active" : ""}
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

      <nav aria-label="..." className="d-flex justify-content-center mt-2">
        <ul className="pagination">
          <li className={`page-item ${page <= 1 && "disabled"}`}>
            <a
              className="page-link"
              onClick={() => setPage(page > 1 ? page - 1 : page)}
            >
              Previous
            </a>
          </li>
          {users.data && renderPagesNumber()}

          <li
            className={`page-item ${
              page >= Math.ceil(users.total / limit) && "disabled"
            }`}
          >
            <a
              className="page-link"
              onClick={() =>
                setPage(page < Math.ceil(users.total / limit) ? page + 1 : page)
              }
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Users;
