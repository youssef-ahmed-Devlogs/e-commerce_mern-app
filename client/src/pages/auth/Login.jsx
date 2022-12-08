import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ sidebarIsOpen }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = ({ currentTarget }) => {
    setFormData({ ...formData, [currentTarget.name]: currentTarget.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = "http://localhost:8000/api/v1/users/login";
      const { data } = await axios.post(url, formData);
      localStorage.setItem("token", data.token);
      navigate("/");

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
            <h1 className="page-head">Welcome back!</h1>

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

            {errors &&
              errors.map((error, i) => (
                <div className="text-danger" key={i}>
                  {error.message}
                </div>
              ))}

            <button className="btn btn-primary d-flex align-items-center justify-content-center gap-2 mt-3 w-100">
              <i className="fas fa-door-open"></i>
              Login
            </button>
          </form>

          <img
            className="form-image"
            style={{ height: "300px" }}
            src="https://i.picsum.photos/id/906/354/536.jpg?hmac=rUZPidmAVgczkT0YxKGA52z05y2YRf1EnjvSZXXhAQI"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
