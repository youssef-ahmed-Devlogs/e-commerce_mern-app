import Footer from "./components/Footer";
import Header from "./components/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import SignUp from "./pages/auth/SignUp";
import { useLocation } from "react-router-dom";
import Login from "./pages/auth/Login";

function App() {
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
    const blackList = ["signup", "login"];

    return blackList.includes(pathname.split("/").join(""));
  };

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
          {true && (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
            </>
          )}

          <Route
            path="/signup"
            element={
              false ? (
                <SignUp sidebarIsOpen={sidebarIsOpen} />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />

          <Route
            path="/login"
            element={
              false ? (
                <Login sidebarIsOpen={sidebarIsOpen} />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />

          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>

        {!checkIfInSignupOrLogin() && <Footer />}
      </main>
    </div>
  );
}

export default App;
