import React, { useEffect } from "react";
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
      dispatch(showLoading())
      //  <!--=============== POST Api  ===============-->

      const res = await axios.post('/api/v1/user/getUserData',
      {token : localStorage.getItem('token')},
      {
        headers:{
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      })
      //  <!--=============== Post data end  ===============-->
      dispatch(hideLoading())
      if(res.data.success){
        console.log(res.data.data,"tinku loging data dot data")
        dispatch(setUser(res.data.data))
      }else {
        <Navigate to="/login"/>
        localStorage.clear();
      }
      //  <!--=============== check if we are getting user or not  ===============-->
      // dispatch(setUser);
    } catch (error) {
      dispatch(hideLoading())
      localStorage.clear();
      console.log(error)
    }
  }
// IF WE DON'T GET THE TOKEN
useEffect(() => {
  if (!user) {
    getUser();
  }
}, [user, getUser]); 
  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }

}