import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const HandleSearch = (event) => {
    props.searchSet(event.target.value === "" ? "car" : event.target.value);
    props.pageset(1);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <span class="badge text-bg-warning fs-5  font-weight-bold ">
            G-Pic
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-3 mb-lg-1">
            <li class="nav-item ">
              <Link class="nav-link active" aria-current="page" to="/">
                <u>Home</u>
              </Link>
            </li>
            <li class="nav-item ">
              <Link class="nav-link active" aria-current="page" to="/delete">
                <u>Blocked Image</u>
              </Link>
            </li>
            <li class="nav-item ">
              <Link class="nav-link active" aria-current="page" to="/collection">
                <u>Collection</u>
              </Link>
            </li>
          </ul>
          <form
            className="d-flex"
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <input
              className="form-control me-2 border border-success"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={HandleSearch}
            />
          </form>
        </div>
      </div>
    </nav>
  );
}
