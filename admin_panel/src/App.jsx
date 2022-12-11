import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Login from "./pages/auth/Login";
import { protect, resetState } from "./store/auth/actions";

function App() {
  // protect routes
  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.token) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    setLoading(false);
    dispatch(protect());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
    }

    if (isError) {
      toast.error(message);
    }

    dispatch(resetState());
  }, [isSuccess, isError, dispatch, message]);

  // Sidebar settings
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

  useState(() => {
    const isOpenInLocalStorage = localStorage.getItem("sidebarIsOpen")
      ? JSON.parse(localStorage.getItem("sidebarIsOpen"))
      : sidebarIsOpen;
    setSidebarIsOpen(isOpenInLocalStorage);

    if (!isOpenInLocalStorage) {
      document.querySelector("body").classList.remove("sidebar-open");
    } else {
      document.querySelector("body").classList.add("sidebar-open");
    }
  }, []);

  // Remove header and sidebar and any thing like that when we in specific pages
  const { pathname } = useLocation();

  const checkIfInSignupOrLogin = () => {
    const blackList = ["login"];
    return blackList.includes(pathname.split("/").join(""));
  };

  if (isLoading || loading) {
    return (
      <div className="" style={{ position: "fixed", left: "50%", top: "50%" }}>
        <div
          className="spinner-grow text-primary"
          role="status"
          style={{ width: "50px", height: "50px" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={!checkIfInSignupOrLogin() ? "wrapper" : ""}>
      {!checkIfInSignupOrLogin() && <Sidebar sidebarIsOpen={sidebarIsOpen} />}

      <main>
        {!checkIfInSignupOrLogin() && (
          <Header
            sidebarIsOpen={sidebarIsOpen}
            setSidebarIsOpen={setSidebarIsOpen}
          />
        )}

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route
            path="/login"
            element={<Login sidebarIsOpen={sidebarIsOpen} />}
          />
          {/* <Route path="*" element={<Navigate replace to="/login" />} /> */}
        </Routes>

        <ToastContainer />

        {!checkIfInSignupOrLogin() && <Footer />}
      </main>
    </div>
  );
}

export default App;
