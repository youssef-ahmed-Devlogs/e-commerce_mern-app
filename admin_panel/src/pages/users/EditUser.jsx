import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaArrowLeft, FaUserEdit, FaUserLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import BeautifulInput from "../../components/BeautifulInput";
import BeautifulSelect from "../../components/BeautifulSelect";
import BeautifulUploader from "../../components/BeautifulUploader";
import FancyCheckbox from "../../components/FancyCheckbox";
import updateUserValidation from "../../helpers/validation/updateUserValidation";
import Validator from "../../helpers/Validator";
import { handleBackAuto } from "../../store/settings/actions";
import { updateUser, updateUserPassword } from "../../store/users/actions";

function EditUser() {
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

  const [userImage, setUserImage] = useState("");

  const { userId } = useParams();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { backAfterSubmit } = useSelector((state) => state.siteSettings);

  const fetchUser = async (userId) => {
    const loggedInUser = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {};

    const token = loggedInUser && loggedInUser.token && loggedInUser.token;

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const user = data.data;

    setFormData({
      ...formData,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
    });

    setUserImage(user.photo);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpload = (e) => {
    const photo = e.target.files[0];
    setFormData({ ...formData, photo });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation update form only without passwords
    const formUpdate = { ...formData };
    delete formUpdate.password;
    delete formUpdate.passwordConfirm;

    const validatorErrors = updateUserValidation(formUpdate);
    setErrors(validatorErrors);

    if (Object.keys(validatorErrors).length === 0) {
      dispatch(
        updateUser(userId, {
          formData,
          navigate,
          setUploadProgress,
          update: () => {
            fetchUser(userId);
          },
        })
      );
    }
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();

    const { password, passwordConfirm } = formData;

    const validator = new Validator({ password, passwordConfirm });
    const validatorErrors = validator
      .setValidation({
        password: ["required", "min:8", "max:50"],
        passwordConfirm: ["required", "match:password", "min:8", "max:50"],
      })
      .setMessages({
        password: {
          required: "password is required",
          min: "password must be grater than 8 characters.",
          max: "password must be less than 50 characters.",
        },
        passwordConfirm: {
          required: "password confirm is required",
          match: "passwords are not the same.",
          min: "password confirm must be grater than 8 characters.",
          max: "password confirm must be less than 50 characters.",
        },
      })
      .prepare()
      .getObjectErrors();

    setErrors(validatorErrors);

    // Validation
    if (Object.keys(validatorErrors).length === 0) {
      dispatch(
        updateUserPassword(userId, {
          formData,
          update: () => {
            setFormData({ ...formData, password: "", passwordConfirm: "" });
          },
        })
      );
    }
  };

  useEffect(() => {
    fetchUser(userId);
  }, []);

  return (
    <>
      <div className="main-content create-user-page">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="page-head">Edit User</h1>

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
            {userImage && (
              <div className="col-xl-3 my-3">
                <img
                  src={`${process.env.REACT_APP_STORAGE_URL}/users/${userImage}`}
                  alt=""
                  className="w-100 rounded"
                />
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-xl-6">
              <BeautifulInput
                label={{ text: "First Name", for: "firstName" }}
                type="text"
                id="firstName"
                placeholder="First Name"
                onChange={handleChange}
                value={formData.firstName}
                errors={errors}
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
                errors={errors}
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
                errors={errors}
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
                errors={errors}
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
                errors={errors}
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
                errors={errors}
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
                errors={errors}
              >
                <option value="1">Active</option>
                <option value="2">Disabled</option>
                <option value="3">Banned</option>
              </BeautifulSelect>
            </div>
          </div>

          <div className="col-xl-12">
            <BeautifulUploader
              label={{ text: "Photo", for: "photo" }}
              id="photo"
              onChange={handleUpload}
              uploadprogress={uploadProgress}
              errors={errors}
            />
          </div>

          <button className="btn btn-success mt-2 d-flex align-items-center gap-2">
            <FaUserEdit />
            Update
          </button>
        </form>

        <form onSubmit={handleSubmitPassword} className="mt-5">
          <div className="row">
            <div className="col-xl-6">
              <BeautifulInput
                label={{ text: "Password", for: "password" }}
                type="password"
                id="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
                errors={errors}
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
                errors={errors}
              />
            </div>
          </div>

          <button className="btn btn-secondary mt-2 d-flex align-items-center gap-2">
            <FaUserLock />
            Update Password
          </button>
        </form>
      </div>
    </>
  );
}

export default EditUser;
