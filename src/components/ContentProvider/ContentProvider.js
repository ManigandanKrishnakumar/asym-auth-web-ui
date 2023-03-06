import React from "react";
import { RouterOutlet } from "../../routes";

import "./ContentProvider.scss";

export const ContentProvider = () => {
  return (
    <div className="content-provider-container primary">
      <RouterOutlet />
    </div>
  );
};
