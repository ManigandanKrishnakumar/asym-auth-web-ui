import React from "react";

import "./TestFunctionality.css";
import { AsymAuth } from "../../asym-auth-client-sdk/asym-auth-client";

const asymAuth = new AsymAuth();
export const TestFunctionality = () => {
  return (
    <div>
      <h1>Functionality Page</h1>
      <button
        onClick={async () => {
          const response = await asymAuth.createAccountKeyPair("mani");
          const ele = document.getElementById("result");
          ele.innerHTML = JSON.stringify(response);
        }}
      >
        Create Key Pair
      </button>
      <button
        className="ms-2"
        onClick={async () => {
          const response = await asymAuth.fetchExistingUsernames();
          const ele = document.getElementById("result");
          ele.innerHTML = JSON.stringify(response);
        }}
      >
        Fetch Existing Usernames
      </button>
      <div id="result"></div>
    </div>
  );
};
