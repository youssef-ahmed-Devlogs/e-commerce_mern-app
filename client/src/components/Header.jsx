import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = ({ sidebarIsOpen, setSidebarIsOpen }) => {
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

  useEffect(() => {
    // setSidebarIsOpen(true);
    // document.querySelector("body").classList.add("sidebar-open");
  }, []);

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
          <i className="fas fa-cog"></i>
        </Link>

        {/* Profile Area */}
        <Link
          to="/signup"
          className="profile-area d-flex align-items-center gap-2"
        >
          <div className="username">Youssef Ahmed</div>
          <div className="photo">
            <img
              src="https://scontent.fcai19-4.fna.fbcdn.net/v/t39.30808-6/300379318_611769147160937_8224297053076357217_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeF9vk_mh_uJtw6y1U40YaoKScGwwD6mDl9JwbDAPqYOXz7dZnz9UIqxYPB07h73b8X00h1xPIO2Wg_I2_qdXikd&_nc_ohc=QbTOJgiVAdIAX_1IXwk&_nc_ht=scontent.fcai19-4.fna&oh=00_AfCosvet3N7uNgljKVhUVzefzNlhoUc0it35r4X2NSOdgg&oe=639680F5"
              alt="username"
            />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
