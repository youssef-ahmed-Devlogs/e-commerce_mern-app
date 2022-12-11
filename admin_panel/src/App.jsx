import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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
import Error404 from "./pages/errors/Error404";
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
    <div className="wrapper">
      <Sidebar sidebarIsOpen={sidebarIsOpen} />

      <main>
        <Header
          sidebarIsOpen={sidebarIsOpen}
          setSidebarIsOpen={setSidebarIsOpen}
        />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route
            path="/login"
            element={<Login sidebarIsOpen={sidebarIsOpen} />}
          />
          <Route path="/404" element={<Error404 />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>

        <ToastContainer />
        <Footer />
      </main>
    </div>
  );
}

export default App;
