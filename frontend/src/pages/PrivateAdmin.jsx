import React from 'react'
import { Navigate } from "react-router-dom";
const PrivateAdmin = ({children}) => {
    const { role } = JSON.parse(sessionStorage.getItem("userData")) || null;

  if (role != "admin") {
    return <Navigate to="/" />;
  }
      return children

}

export default PrivateAdmin
