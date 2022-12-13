import React from "react";
import { useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { FaArrowLeft, FaPlusSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BeautifulInput from "../../components/BeautifulInput";
import BeautifulSelect from "../../components/BeautifulSelect";
import FancyCheckbox from "../../components/FancyCheckbox";
import { handleBackAuto } from "../../store/settings/actions";
import { createUser } from "../../store/users/actions";

function CreateUser() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    photo: "",
    role: "user",
    status: "1",
  });

  const resetState = () => {
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phone: "",
      photo: "",
      role: "user",
      status: "1",
    });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { backAfterSubmit } = useSelector((state) => state.siteSettings);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpload = (e) => {
    const photo = e.target.files[0];
    setFormData({ ...formData, photo });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (false) {
    } else {
      dispatch(createUser(formData, navigate, setUploadProgress));
      resetState();
    }
  };

  return (
    <>
      <div className="main-content create-user-page">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="page-head">Create New User</h1>

          <div className="d-flex align-items-center justify-content-between gap-3">
            <FancyCheckbox
              id="backAuto"
              title="Back After Submit"
              onChange={() => dispatch(handleBackAuto(!backAfterSubmit))}
              checked={backAfterSubmit}
            />

            <Link to="/users" className="btn btn-primary">
              <FaArrowLeft className="me-1" />
              Back
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-xl-6">
              <BeautifulInput
                label={{ text: "First Name", for: "firstName" }}
                type="text"
                id="firstName"
                placeholder="First Name"
                onChange={handleChange}
                value={formData.firstName}
              />
            </div>

            <div className="col-xl-6">
              <BeautifulInput
                label={{ text: "Last Name", for: "lastName" }}
                type="text"
                id="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                value={formData.lastName}
              />
            </div>

            <div className="col-xl-6">
              <BeautifulInput
                label={{ text: "Username", for: "username" }}
                type="text"
                id="username"
                placeholder="Username"
                onChange={handleChange}
                value={formData.username}
              />
            </div>

            <div className="col-xl-6">
              <BeautifulInput
                label={{ text: "Email", for: "email" }}
                type="email"
                id="email"
                placeholder="Email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>

            <div className="col-xl-6">
              <BeautifulInput
                label={{ text: "Phone", for: "phone" }}
                type="text"
                id="phone"
                placeholder="Phone"
                onChange={handleChange}
                value={formData.phone}
              />
            </div>

            <div className="col-xl-6">
              <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />
              <BeautifulInput
                label={{ text: "Photo", for: "photo" }}
                type="file"
                id="photo"
                placeholder="Photo"
                onChange={handleUpload}
              />
            </div>

            <div className="col-xl-6">
              <BeautifulInput
                label={{ text: "Password", for: "password" }}
                type="password"
                id="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>

            <div className="col-xl-6">
              <BeautifulInput
                label={{ text: "Password Confirm", for: "passwordConfirm" }}
                type="password"
                id="passwordConfirm"
                placeholder="Password Confirm"
                onChange={handleChange}
                value={formData.passwordConfirm}
              />
            </div>

            <div className="col-xl-6">
              <BeautifulSelect
                label={{ text: "Role", for: "role" }}
                type="text"
                id="role"
                placeholder="Role"
                onChange={handleChange}
                value={formData.role}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </BeautifulSelect>
            </div>

            <div className="col-xl-6">
              <BeautifulSelect
                label={{ text: "Status", for: "status" }}
                type="text"
                id="status"
                placeholder="Status"
                onChange={handleChange}
                value={formData.status}
              >
                <option value="1">Active</option>
                <option value="2">Disabled</option>
                <option value="3">Banned</option>
              </BeautifulSelect>
            </div>
          </div>

          <button className="btn btn-primary mt-2 d-flex align-items-center gap-2">
            <FaPlusSquare />
            Create
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateUser;
