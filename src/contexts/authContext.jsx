import React, { createContext, useEffect, useReducer } from "react";
import authReducer from "../reducers/authReducer";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'

export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const localStorageData = JSON.parse(localStorage.getItem("data"));

  const initialAuth = {
    user: localStorageData?.user || {},
    token: localStorageData?.token || "",
  };

  const [authState, authDispatch] = useReducer(authReducer, initialAuth);

  const adminLogin = async (loginData) => {
    console.log(loginData)
    try {
      const { status, data } = await toast.promise(
        axios.post(`https://www.atbtbeta.teksacademy.com/adminlogin`, loginData),
        {
          pending: 'logging In...',
          success: {
            render({ data: { data: { adminData: { fullname } } } }) {
              return `Welcome ${fullname}`
            }
          },
          error: 'Wrong Credentials 🤯',
        },
      )
      if (status === 200) {
        localStorage.setItem(
          "data",
          JSON.stringify({ user: data?.adminData, token: data?.token })
        );
        authDispatch({ type: "SET_USER", payload: data?.adminData });
        authDispatch({ type: "SET_TOKEN", payload: data?.token });
        navigate(location?.state?.from?.pathname || "/sidebar");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const createUser = async (userData) => {
    try {
      const { status, data } = await toast.promise(
        axios.post(`https://www.atbtbeta.teksacademy.com/createuser`, userData),
        {
          pending: 'Creating User...',
          success: {
            render({data: {data: {reqBody: {name = ""}}}}) {
              console.log(name)
              return `user ${name} created`
            }
          },
          error: 'Check user details 🤯',
        },
      )
      // if (status === 200) {
        // localStorage.setItem(
        //   "data",
        //   JSON.stringify({ user: data?.adminData, token: data?.token })
        // );
        // authDispatch({ type: "SET_USER", payload: data?.adminData });
        // authDispatch({ type: "SET_TOKEN", payload: data?.token });
        // navigate(location?.state?.from?.pathname || "/sidebar");
      // }
    } 
    catch (e) {
      console.error(e);
    }
  };

  const changePassword = async ({ email }) => {
    try {
      const { status, data } = await toast.promise(
        axios.post(`https://www.atbtbeta.teksacademy.com/api/send-email?email=${email}`),
        {
          pending: 'verifying email',
          success: {
            render({ data: { data: { message } } }) {
              return `${message}`
            }
          },
          error: 'invalid email 🤯',
        },
      )
      if (status === 200) {
        navigate("/login");
        Swal.fire({
          title: "Reset Password Success!",
          text: "Check your email for reset instructions.",
          icon: "success"
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const resetPassword = async ({ id, password }) => {
    try {
      const { status, data } = await toast.promise(
        axios.put(`https://www.atbtbeta.teksacademy.com/resetpassword/${id}`, { password }),
        {
          pending: 'verifying data',
          success: {
            render({ data: { data: { updated } } }) {
              return `Password Updated`
            }
          },
          error: 'unautorized Access 🤯',
        },
      )
      //   if (status === 200) {
      //     localStorage.setItem(
      //       "data",
      //       JSON.stringify({ user: data?.adminData, token: data?.token })
      //     );
      //     authDispatch({ type: "SET_USER", payload: data?.adminData });
      //     authDispatch({ type: "SET_TOKEN", payload: data?.token });
      //     navigate(location?.state?.from?.pathname || "/");
      //   }
    } catch (e) {
      console.error(e);
    }
  };

  const userLogout = () => {
    localStorage.removeItem("data");
    authDispatch({ type: "SET_USER", payload: {} });
    authDispatch({ type: "SET_TOKEN", payload: "" });
    navigate("/");
  };

  useEffect(() => {
    if (localStorageData) {
      authDispatch({ type: "SET_USER", payload: localStorageData?.user });
      authDispatch({ type: "SET_TOKEN", payload: localStorageData?.token });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ authState, adminLogin, createUser, changePassword, resetPassword, userLogout, localStorageData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;