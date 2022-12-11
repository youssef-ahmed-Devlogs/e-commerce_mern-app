function MainFilters() {
  return (
    <div className="table-filter row">
      <div className="col-xl-4 mb-2">
        <div className="w-100">
          <label htmlFor="search">Search</label>
          <input
            id="search"
            type="text"
            placeholder="Search by name, username, email..."
            className="form-control"
            value={mainFilterData.search}
            onChange={(e) => dispatch(searchFilter(e.target.value))}
          />
        </div>
      </div>

      <div className="col-xl-4 mb-2">
        <div className="w-100">
          <label htmlFor="sortOrder">Order By</label>
          <select
            id="sortOrder"
            className="form-control"
            onChange={(e) => dispatch(sortOrderFilter(e.target.value))}
            value={mainFilterData.order}
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      </div>

      <div className="col-xl-4 mb-2">
        <div className="w-100">
          <label htmlFor="limitFields">Limit Fields</label>
          <select
            id="limitFields"
            className="form-control"
            onChange={(e) => dispatch(changeLimit(+e.target.value))}
            value={paginationData.limit}
          >
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      <div className="col-xl-4 mb-2">
        <div className="w-100">
          <label htmlFor="paginationNumsCount">Pagination Numbers</label>
          <select
            id="paginationNumsCount"
            className="form-control"
            onChange={(e) =>
              dispatch(changePaginationNumsCount(+e.target.value))
            }
            value={paginationData.paginationNumsCount}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>

      <div className="col-xl-4 mb-2">
        <div className="w-100">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            className="form-control"
            onChange={(e) =>
              setFilterData({ ...filterData, role: e.target.value })
            }
            value={filterData.role}
          >
            <option value="">All</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <div className="col-xl-4 mb-2">
        <div className="w-100">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            className="form-control"
            onChange={(e) =>
              setFilterData({ ...filterData, status: e.target.value })
            }
            value={filterData.status}
          >
            <option value="">All</option>
            <option value="1">Active</option>
            <option value="2">Disabled</option>
            <option value="3">Banned</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default MainFilters;
