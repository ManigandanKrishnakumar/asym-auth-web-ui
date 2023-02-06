import React from "react";
import { PAGES } from "../../constants/navConstants";
import { NavItem } from "../NavItem/NavItem";

import "./SideBar.scss";

export const SideBar = () => {
  return (
    <div id="side-bar-container">
      <h3>Asym Login</h3>
      {PAGES.map((page) => {
        return <NavItem pageUrl={page.url} label={page.name} key={page.id} />;
      })}
    </div>
  );
};
