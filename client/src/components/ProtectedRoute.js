import React from "react";
import { Navigate } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux';

export default function ProtectedRoute({ children }) {

  const dispatch = useDispatch();




  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}