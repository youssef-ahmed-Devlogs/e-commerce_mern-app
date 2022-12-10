import axios from "axios";
import { useEffect, useState } from "react";

const Users = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // axios
    //   .get("api/v1/users", {
    //     headers: {
    //       Authorization:
    //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODhmMTJjZTI3YzZmNjY4ZmYzOTE3MyIsImlhdCI6MTY3MDUxNDQ2MSwiZXhwIjoxNjcwNjg3MjYxfQ.8J4qO39EoSJJ-xCZ3DAtgA_NVXxzr7Lei-N8xxgvF34",
    //     },
    //   })
    //   .then((res) => {
    //     setUsers(res.data.data);
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     if (err.response) {
    //       console.log(err.response.data);
    //       // alert(err.response.data.message);
    //     }
    //   });
  }, []);

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
    return users.map((user) => (
      <tr key={user.id}>
        <th scope="row">1</th>
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

  return (
    <div className="main-content users-page">
      <h1 className="page-head">Users</h1>

      <div className="card card-table">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Photo</th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Status</th>
                <th scope="col">Role</th>
                <th scope="col">Joined In</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>{renderUsers()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
