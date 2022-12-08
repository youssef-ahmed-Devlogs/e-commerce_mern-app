import { useEffect, useState } from "react";

const Users = (props) => {
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
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>
                  <img
                    src="https://scontent.fcai19-4.fna.fbcdn.net/v/t39.30808-6/300379318_611769147160937_8224297053076357217_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeF9vk_mh_uJtw6y1U40YaoKScGwwD6mDl9JwbDAPqYOXz7dZnz9UIqxYPB07h73b8X00h1xPIO2Wg_I2_qdXikd&_nc_ohc=QbTOJgiVAdIAX_1IXwk&_nc_ht=scontent.fcai19-4.fna&oh=00_AfCosvet3N7uNgljKVhUVzefzNlhoUc0it35r4X2NSOdgg&oe=639680F5"
                    alt="user photo"
                  />
                </td>
                <td>Youssef Ahmed</td>
                <td>youssef27</td>
                <td>youssef27.10ahmad@gmail.com</td>
                <td>01154214028</td>
                <td>
                  <span className="bdg bdg-success">Active</span>
                </td>
                <td>Admin</td>
                <td>2020-12-05</td>
                <td>
                  <a href="#" className="btn btn-sm btn-success me-1">
                    Edit
                  </a>
                  <a href="#" className="btn btn-sm btn-danger me-1">
                    Delete
                  </a>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>
                  <img
                    src="https://scontent.fcai19-4.fna.fbcdn.net/v/t39.30808-6/300379318_611769147160937_8224297053076357217_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeF9vk_mh_uJtw6y1U40YaoKScGwwD6mDl9JwbDAPqYOXz7dZnz9UIqxYPB07h73b8X00h1xPIO2Wg_I2_qdXikd&_nc_ohc=QbTOJgiVAdIAX_1IXwk&_nc_ht=scontent.fcai19-4.fna&oh=00_AfCosvet3N7uNgljKVhUVzefzNlhoUc0it35r4X2NSOdgg&oe=639680F5"
                    alt="user photo"
                  />
                </td>
                <td>Youssef Ahmed</td>
                <td>youssef27</td>
                <td>youssef27.10ahmad@gmail.com</td>
                <td>01154214028</td>
                <td>
                  <span className="bdg bdg-warning">Disabled</span>
                </td>
                <td>Admin</td>
                <td>2020-12-05</td>
                <td>
                  <a href="#" className="btn btn-sm btn-success me-1">
                    Edit
                  </a>
                  <a href="#" className="btn btn-sm btn-danger me-1">
                    Delete
                  </a>
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>
                  <img
                    src="https://scontent.fcai19-4.fna.fbcdn.net/v/t39.30808-6/300379318_611769147160937_8224297053076357217_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeF9vk_mh_uJtw6y1U40YaoKScGwwD6mDl9JwbDAPqYOXz7dZnz9UIqxYPB07h73b8X00h1xPIO2Wg_I2_qdXikd&_nc_ohc=QbTOJgiVAdIAX_1IXwk&_nc_ht=scontent.fcai19-4.fna&oh=00_AfCosvet3N7uNgljKVhUVzefzNlhoUc0it35r4X2NSOdgg&oe=639680F5"
                    alt="user photo"
                  />
                </td>
                <td>Youssef Ahmed</td>
                <td>youssef27</td>
                <td>youssef27.10ahmad@gmail.com</td>
                <td>01154214028</td>
                <td>
                  <span className="bdg bdg-danger">Banned</span>
                </td>
                <td>User</td>
                <td>2020-12-05</td>
                <td>
                  <a href="#" className="btn btn-sm btn-success me-1">
                    Edit
                  </a>
                  <a href="#" className="btn btn-sm btn-danger me-1">
                    Delete
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
