import React, { useContext } from 'react';
import "./AdminDashboard.scss";
import { PageHeading } from "../../components";
import { useNavigate } from 'react-router-dom';
import {useEffect} from 'react';
import { USER_ROLES } from "../../constants/appConstants";
import { AppContext } from "../../state-management/app-context";
import {STATES } from "../../state-management/constants";

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const {data} = useContext(AppContext);
  const user = data[STATES.CURRENT_USER];
  
  useEffect(() => {
  if (((user.userRole === USER_ROLES.ADMIN) && data[STATES.IS_LOGGED_IN]) !== true ) {
    navigate('/');
  }
}, []);
  return (
    <div className="admin-dashboard-container">
      <PageHeading heading="Admin Dashboard" />
    </div>
  );
};
