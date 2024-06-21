import React, { Component } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation

// Defining the NavBar component as a class component
export class NavBar extends Component {
  render() {
    return (
      <div>
        {/* Navbar component with Bootstrap classes */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            {/* Brand link that redirects to the home page */}
            <Link className="navbar-brand" to="/">
              News Portal
            </Link>
            {/* Button for toggling the navbar in mobile view */}
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
            {/* Collapsible content for the navbar */}
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              {/* Navbar items list */}
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* Link to the home page */}
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                {/* Link to the business news page */}
                <li className="nav-item">
                  <Link className="nav-link" to="/business">
                    Business
                  </Link>
                </li>
                {/* Link to the entertainment news page */}
                <li className="nav-item">
                  <Link className="nav-link" to="/entertainment">
                    Entertainment
                  </Link>
                </li>
                {/* Link to the general news page */}
                <li className="nav-item">
                  <Link className="nav-link" to="/general">
                    General
                  </Link>
                </li>
                {/* Link to the health news page */}
                <li className="nav-item">
                  <Link className="nav-link" to="/health">
                    Health
                  </Link>
                </li>
                {/* Link to the science news page */}
                <li className="nav-item">
                  <Link className="nav-link" to="/science">
                    Science
                  </Link>
                </li>
                {/* Link to the sports news page */}
                <li className="nav-item">
                  <Link className="nav-link" to="/sports">
                    Sports
                  </Link>
                </li>
                {/* Link to the technology news page */}
                <li className="nav-item">
                  <Link className="nav-link" to="/technology">
                    Technology
                  </Link>
                </li>
                {/* Link to the favorites page */}
                <li className="nav-item">
                  <Link className="nav-link" to="/favorites">
                    Favorites
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar; // Export the NavBar component
