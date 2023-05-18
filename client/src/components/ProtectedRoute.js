import React from "react";
import { Navigate } from "react-router-dom";
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux';
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";

export default function ProtectedRoute({ children }) {

  const dispatch = useDispatch();
  // for getting user 

  const {user} = useSelector(state => state.user)
  const getUser = async() => {
    try {
      dispatch(showLoading)
      //  <!--=============== POST Api  ===============-->
      const res = await axios.post('/api/v1/user/getUserData',
      {token : localStorage.getItem('token')},
      {
        headers:{
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      })
      //  <!--=============== Loading hide  ===============-->
      dispatch(hideLoading())
      //  <!--=============== check if we are getting user or not  ===============-->
      dispatch(setUser);
      
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
    }
  }

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}