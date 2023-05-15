import React from "react";
import { Navigate } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux';

export default function ProtectedRoute({ children }) {

  const dispatch = useDispatch();
  // for getting user 

  const {user} = useSelector(state => state.user)

  const getUser async() => {
    try {
      
    } catch (error) {
      console.log(error)
    }
  }


  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}