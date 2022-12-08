import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

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

  return (
    <div className="wrapper">
      <Sidebar sidebarIsOpen={sidebarIsOpen} />
      <main>
        <Header
          sidebarIsOpen={sidebarIsOpen}
          setSidebarIsOpen={setSidebarIsOpen}
        />
        <Home />
        <Footer />
      </main>
    </div>
  );
}

export default App;
