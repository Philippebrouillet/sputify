import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/AppHeader.css";

export default function AppHeader() {
  const [sideBar, setSideBar] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light px-4 mb-4">
      <Link to="/" className="navbar-brand">
        <span id="logo">Sputify</span>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span
          className="navbar-toggler-icon"
          onClick={() => setSideBar(!sideBar)}
        ></span>
      </button>
      {sideBar && (
        <div className="ModalNavBar">
          {" "}
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link
                to="/"
                className="nav-link"
                style={{
                  color: "#0250C4",
                  fontSize: "1.3rem",
                  textDecoration: "underline",
                }}
              >
                Accueil
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                to="/albums"
                className="nav-link .hover-zoom"
                style={{
                  color: "#0250C4",
                  fontSize: "1.3rem",

                  textDecoration: "underline",
                }}
              >
                Albums
              </Link>
            </li>
          </ul>{" "}
        </div>
      )}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Accueil
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/albums" className="nav-link">
              Albums
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
