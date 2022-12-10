import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout as logoutAction, updateState } from "../store/auth/actions";

const Sidebar = ({ sidebarIsOpen }) => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(updateState({ isLoading: true }));
    dispatch(logoutAction());
  };

  return (
    <aside className={`sidebar ${sidebarIsOpen ? "sidebar-open" : ""}`}>
      <a href="/" className="brand">
        MeStore
      </a>

      <nav>
        <NavLink to="/" className="nav-link d-flex align-items-center gap-2">
          <i className="fas fa-tachometer-alt"></i>
          Dashboard
        </NavLink>
        <NavLink
          to="/users"
          className="nav-link d-flex align-items-center gap-2"
        >
          <i className="fas fa-users"></i>
          Users
        </NavLink>
        <NavLink
          to="/products"
          className="nav-link d-flex align-items-center gap-2"
        >
          <i className="fas fa-box-open"></i>
          Products
        </NavLink>
        <NavLink
          to="/categories"
          className="nav-link d-flex align-items-center gap-2"
        >
          <i className="fas fa-sitemap"></i>
          Categories
        </NavLink>
        <NavLink
          to="/reviews"
          className="nav-link d-flex align-items-center gap-2"
        >
          <i className="fas fa-star"></i>
          Reviews
        </NavLink>
        <NavLink
          to="/orders"
          className="nav-link d-flex align-items-center gap-2"
        >
          <i className="fas fa-truck-moving"></i>
          Orders
        </NavLink>
        <NavLink
          to="/settings"
          className="nav-link d-flex align-items-center gap-2"
        >
          <i className="fas fa-cog"></i>
          Settings
        </NavLink>

        <button
          onClick={logout}
          className="nav-link d-flex align-items-center gap-2"
        >
          <i className="fas fa-door-open"></i>
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
