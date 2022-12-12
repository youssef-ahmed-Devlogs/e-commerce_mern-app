import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, updateState } from "../../store/auth/actions";

const Login = ({ sidebarIsOpen }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, message, user } = useSelector((state) => state.auth);

  const handleChange = ({ currentTarget }) => {
    setFormData({ ...formData, [currentTarget.name]: currentTarget.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Validation in frontend

    /**
     * email required
     * password required
     * email must be a valid email
     * password min 8 char
     */

    if (!email) {
      toast.error("Please provide the email");
    } else if (!password) {
      toast.error("Please provide the password");
    } else {
      dispatch(updateState({ isLoading: true }));
      dispatch(login(formData));
    }
  };

  useEffect(() => {
    document.body.classList.remove("sidebar-open");

    return () => {
      if (sidebarIsOpen) {
        document.body.classList.add("sidebar-open");
      }
    };
  }, [sidebarIsOpen]);

  useEffect(() => {
    if (user.token) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="signup-page">
      <div className="card-form">
        <div className="form-design">
          {/* FORM */}
          <form onSubmit={handleSubmit}>
            <h1 className="page-head">Welcome back!</h1>

            {isError && message && (
              <div className="alert alert-danger">{message}</div>
            )}
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
