import React from 'react';
import { PageHeading } from "../../components";
import "./ProtectedPage.css";
import UserInfo from '../../components/UpdateUserInfo/UpdateUserInfo';

export const ProtectedPage = () => {
  

  return  (
    <>
    <PageHeading heading="Update User Info" />
    <UserInfo/>
    </>
  );
};
