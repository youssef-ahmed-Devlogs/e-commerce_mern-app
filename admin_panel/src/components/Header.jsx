import { Link } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = ({ sidebarIsOpen, setSidebarIsOpen }) => {
  const loggedInUser = useSelector((state) => state.auth.user.data);

  // Sidebar settings
  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
    localStorage.setItem("sidebarIsOpen", !sidebarIsOpen);

    if (sidebarIsOpen) {
      document.querySelector("body").classList.remove("sidebar-open");
    } else {
      document.querySelector("body").classList.add("sidebar-open");
    }
  };

  if (!loggedInUser || !loggedInUser.photo) {
    return <></>;
  }

  return (
    <header className={sidebarIsOpen ? "sidebar-open" : ""}>
      <div className="sidebar-button" onClick={toggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="right-area d-flex align-items-center gap-2">
        {/* Settings */}
        <Link to="/settings" className="settings-button">
          {/* <i className="fas fa-cog"></i> */}
          <FaCog />
        </Link>

        {/* Profile Area */}
        <Link
          to="/signup"
          className="profile-area d-flex align-items-center gap-2"
        >
          <div className="username">{loggedInUser.fullName}</div>
          <div className="photo">
            <img
              src={`http://localhost:8000/storage/users/${loggedInUser.photo}`}
              alt={loggedInUser.fullName}
            />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
