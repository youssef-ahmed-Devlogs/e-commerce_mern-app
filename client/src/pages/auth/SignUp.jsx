import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({ sidebarIsOpen }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleChange = ({ currentTarget }) => {
    setFormData({ ...formData, [currentTarget.name]: currentTarget.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = "http://localhost:8000/api/v1/users/signup";
      const { data } = await axios.post(url, formData);
      // navigate("/");

      console.log(data);
    } catch (err) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ) {
        if (err.response.data.message == "Invalid input data.") {
          setErrors(err.response.data.validationMessages);
        } else {
          const validationMessages = [
            {
              field: "Unknown",
              message: err.response.data.message,
            },
          ];
          setErrors(validationMessages);
        }
      }

      console.log(err);
    }
  };

  useEffect(() => {
    document.body.classList.remove("sidebar-open");

    return () => {
      if (sidebarIsOpen) {
        document.body.classList.add("sidebar-open");
      }
    };
  }, []);

  return (
    <div className="signup-page">
      <div className="card-form">
        <div className="form-design">
          {/* FORM */}
          <form onSubmit={handleSubmit}>
            <h1 className="page-head">Create an Account!</h1>

            <div className="form-item mb-2">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                id="firstName"
                onChange={handleChange}
                value={formData.firstName}
              />
            </div>

            <div className="form-item mb-2">
              <label htmlFor="lastName">Last Name</label>

              <input
                type="text"
                className="form-control"
                name="lastName"
                id="lastName"
                onChange={handleChange}
                value={formData.lastName}
              />
            </div>

            <div className="form-item mb-2">
              <label htmlFor="username">Username</label>

              <input
                type="text"
                className="form-control"
                name="username"
                id="username"
                onChange={handleChange}
                value={formData.username}
              />
            </div>

            <div className="form-item mb-2">
              <label htmlFor="email">Email</label>

              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>

            <div className="form-item mb-2">
              <label htmlFor="phone">Phone</label>

              <input
                type="text"
                className="form-control"
                name="phone"
                id="phone"
                onChange={handleChange}
                value={formData.phone}
              />
            </div>

            <div className="d-flex gap-2">
              <div className="form-item mb-2">
                <label htmlFor="password">Password</label>

                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>
              <div className="form-item mb-2">
                <label htmlFor="passwordConfirm">Password Confirm</label>

                <input
                  type="password"
                  className="form-control"
                  name="passwordConfirm"
                  id="passwordConfirm"
                  onChange={handleChange}
                  value={formData.passwordConfirm}
                />
              </div>
            </div>

            {errors &&
              errors.map((error, i) => (
                <div className="text-danger" key={i}>
                  {error.message}
                </div>
              ))}

            <button className="btn btn-primary d-flex align-items-center justify-content-center gap-2 mt-3 w-100">
              <i className="fas fa-door-open"></i>
              Sign Up
            </button>
          </form>

          <img
            className="form-image"
            src="https://i.picsum.photos/id/906/354/536.jpg?hmac=rUZPidmAVgczkT0YxKGA52z05y2YRf1EnjvSZXXhAQI"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
