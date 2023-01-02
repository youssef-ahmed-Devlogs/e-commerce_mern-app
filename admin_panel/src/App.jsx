import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/users/Users";
import Login from "./pages/auth/Login";
import Error404 from "./pages/errors/Error404";
import { protect, resetAuthState } from "./store/auth/actions";
import CreateUser from "./pages/users/CreateUser";
import EditUser from "./pages/users/EditUser";
import Categories from "./pages/categories/Categories";

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const {
    user,
    isLoading: isAuthLoading,
    isSuccess: isAuthSuccess,
    isError: isAuthError,
    message: messageAuth,
  } = useSelector((state) => state.auth);
  const [loadingPage, setLoadingPage] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // if no token in localStorage navigate to the login page
    if (!user.token) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    // Loading page in reload
    setLoadingPage(false);
    dispatch(protect());
  }, [dispatch, pathname]);

  // Show toast messages in login based on if the authentication process success or not
  useEffect(() => {
    if (isAuthSuccess) {
      toast.success(messageAuth);
    }
    if (isAuthError) {
      toast.error(messageAuth);
    }

    /**
     * Reset auth state to default to remove the current message after showing it
     * set (isAuthSuccess, isAuthError, isAuthSuccess) to false
     */
    dispatch(resetAuthState());
  }, [isAuthSuccess, isAuthError, dispatch, messageAuth]);

  // Sidebar settings
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

  // Get the sidebar status from localStorage and set it
  useState(() => {
    const isOpenInLocalStorage = localStorage.getItem("sidebarIsOpen")
      ? JSON.parse(localStorage.getItem("sidebarIsOpen"))
      : sidebarIsOpen;
    setSidebarIsOpen(isOpenInLocalStorage);

    // Remove ( sidebar-open class) which adds a big padding-left in the body if the sidebar is open
    if (!isOpenInLocalStorage) {
      document.querySelector("body").classList.remove("sidebar-open");
    } else {
      document.querySelector("body").classList.add("sidebar-open");
    }
  }, []);

  // Show spinner if any page is loading or in the authentication process (login)
  if (isAuthLoading || loadingPage) {
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
          <Route path="users">
            <Route index element={<Users />} />
            <Route path="create" element={<CreateUser />} />
            <Route path="edit/:userId" element={<EditUser />} />
          </Route>
          <Route path="categories">
            <Route index element={<Categories />} />
          </Route>
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
