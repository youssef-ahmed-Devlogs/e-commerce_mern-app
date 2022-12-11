import { useDispatch, useSelector } from "react-redux";
import { searchFilter, sortOrderFilter } from "../store/filter/actions";
import {
  changeLimit,
  changePaginationNumsCount,
} from "../store/pagination/action";
import BeautifulInput from "./BeautifulInput";
import BeautifulSelect from "./BeautifulSelect";

function MainFilters(props) {
  // Dispatch
  const dispatch = useDispatch();
  // Pagination State
  const paginationData = useSelector((state) => state.paginationData);
  // Main Filter State [sort, sort_order, search...]
  const mainFilterData = useSelector((state) => state.mainFilterData);

  return (
    <div className={`main-filter ${props.className ? props.className : ""}`}>
      {/* Search Filter */}
      <BeautifulInput
        label={{ text: "Search", for: "search" }}
        id="search"
        width="w-lg"
        type="text"
        placeholder="Search..."
        value={mainFilterData.search}
        onChange={(e) => dispatch(searchFilter(e.target.value))}
      />

      {/* Rows Count Filter */}
      <BeautifulSelect
        label={{ text: "Rows Count ", for: "rowsCount" }}
        id="rowsCount"
        onChange={(e) => dispatch(changeLimit(+e.target.value))}
        value={paginationData.limit}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </BeautifulSelect>

      {/* Pagination Numbers Filter */}
      <BeautifulSelect
        label={{ text: "Pagination Numbers", for: "paginationNumsCount" }}
        id="paginationNumsCount"
        onChange={(e) => dispatch(changePaginationNumsCount(+e.target.value))}
        value={paginationData.paginationNumsCount}
      >
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="10">10</option>
      </BeautifulSelect>

      {/* Order by ( ASC || DESC ) */}
      <BeautifulSelect
        label={{ text: "Order By", for: "sortOrder" }}
        id="sortOrder"
        onChange={(e) => dispatch(sortOrderFilter(e.target.value))}
        value={mainFilterData.order}
      >
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </BeautifulSelect>

      {/* additional filters */}
      {props.children}
    </div>
  );
}

export default MainFilters;
