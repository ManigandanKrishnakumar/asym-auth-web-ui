import React from "react";
import { Link } from "react-router-dom";

import "./NavItem.scss";

export const NavItem = ({ pageUrl, label }) => {
  return (
    <div className="nav-item-container">
      <Link to={pageUrl}>{label}</Link>
    </div>
  );
};
