import React, { useContext } from "react";
import { RouterOutlet } from "../../routes";
import { AppContext } from "../../state-management/app-context";
import { STATES } from "../../state-management/constants";
import { Loader } from "../Loader/Loader";

import "./ContentProvider.scss";

export const ContentProvider = () => {
  const { data } = useContext(AppContext);

  return (
    <div className="content-provider-container primary">
      <RouterOutlet />
      {data[STATES.IS_LOADING] && <Loader />}
    </div>
  );
};
