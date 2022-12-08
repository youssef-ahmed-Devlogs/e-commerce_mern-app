const Sidebar = ({ sidebarIsOpen }) => {
  return (
    <aside className={`sidebar ${sidebarIsOpen ? "sidebar-open" : ""}`}>
      <a href="/" className="brand">
        MeStore
      </a>

      <nav>
        <a href="#" className="nav-link d-flex align-items-center gap-2">
          <i className="fas fa-users"></i>
          Users
        </a>
        <a href="#" className="nav-link d-flex align-items-center gap-2">
          <i className="fas fa-box-open"></i>
          Products
        </a>
        <a href="#" className="nav-link d-flex align-items-center gap-2">
          <i className="fas fa-sitemap"></i>
          Categories
        </a>
        <a href="#" className="nav-link d-flex align-items-center gap-2">
          <i className="fas fa-star"></i>
          Reviews
        </a>
        <a href="#" className="nav-link d-flex align-items-center gap-2">
          <i className="fas fa-truck-moving"></i>
          Orders
        </a>
        <a href="#" className="nav-link d-flex align-items-center gap-2">
          <i className="fas fa-cog"></i>
          Settings
        </a>
        <a href="#" className="nav-link d-flex align-items-center gap-2">
          <i className="fas fa-door-open"></i>
          Logout
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
