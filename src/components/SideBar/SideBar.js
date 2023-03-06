import React, { useContext } from "react";
import { USER_ROLES } from "../../constants/appConstants";
import { PAGES, URLS } from "../../constants/navConstants";
import { AppContext } from "../../state-management/app-context";
import { ACTION_TYPES, STATES } from "../../state-management/constants";
import { AppLogo } from "../AppLogo/AppLogo";
import { NavItem } from "../NavItem/NavItem";

import "./SideBar.scss";

export const SideBar = () => {
  const { data } = useContext(AppContext);
  const shouldHide = (url) => {
    const hideMap = {
      [URLS.userInfo]: () => {
        const isLoggedIn = data[STATES.IS_LOGGED_IN];
        return !isLoggedIn;
      },

      [URLS.adminDashboard]: () => {
        const user = data[STATES.CURRENT_USER];
        return user.userRole !== USER_ROLES.ADMIN;
      },
      default: false,
    };

    if (hideMap[url]) {
      return hideMap[url]();
    }

    return hideMap.default;
  };

  return (
    <div id="side-bar-container">
      <AppLogo />
      {PAGES.map((page) => {
        return (
          <NavItem
            pageUrl={page.url}
            label={page.name}
            key={page.id}
            hide={shouldHide(page.url)}
          />
        );
      })}
    </div>
  );
};
