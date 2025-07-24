import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultComponent from "./components/UserComponent/CommonComponent/DefaultComponent/DefaultComponent";
import AdminLayout from "./components/AdminComponent/AdminLayout/AdminLayout";
import { routes } from "./routes/index";
import * as UserServices from "./services/admin/userServices"
import {
  useQuery
} from '@tanstack/react-query'
import { message } from 'antd';
import { setMessageApi } from './components/UserComponent/CommonComponent/Message/Message'; // đường dẫn đúng
import { isJsonString } from "./utils/utils";
import { jwtDecode } from "jwt-decode";
import * as UserService from "./services/users/authServices"
import { updateUser } from "./redux/slides/userSlide";
import { useDispatch } from "react-redux";
import { handleDecode } from "./utils/authUtils";

import * as authUtils from "./utils/authUtils";


function App() {
  const dispatch = useDispatch()

  // const fetchApi = async () => {
  //   try {
  //     const res = await UserServices.getAllUser()
  //     return res.data
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  //  const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
   const [messageApi, contextHolder] = message.useMessage();

  // // Gán cho toàn bộ app
  setMessageApi(messageApi);

  // useEffect(() => {
  //   const { storageData, decoded } = authUtils.handleDecode()
  //   if(decoded?._id) {
  //     authUtils.handleGetDetailUser(decoded?._id, storageData, dispatch)
  //   }
  // }, [])

  useEffect(() => {
    const fetcDetailUser =async() =>{
      const token = await authUtils.getValidAccessToken();
      try {
        if(token) {
          const res = await UserService.getDetailUser(token);
          const { _id, name, email, phone } = res.data;
          dispatch(updateUser({ _id, name, email, phone }))
        }
        
      } catch (error) {
        console.log(error)
      }
    }
    fetcDetailUser();
  })


  // UserService.axiosJWT.interceptors.request.use(async (config) => {
  //   const currentTime = new Date()
  //   const { decoded } = authUtils.handleDecode()
  //   console.log("decoded", decoded);
  //   if( decoded?.exp < currentTime.getTime() / 1000 ) { 
  //     const data = await UserService.getRefreshToken()
  //     console.log("data.access_token", data.access_token);
  //     config.headers['token'] = `Bearer ${data.access_token}`
  //   }

  //   return config
  // }, function (error) {
  //   return Promise.reject(error)
  // })

  UserServices.axiosJWT.interceptors.request.use(
    async (config) => {
      const token = await authUtils.getValidAccessToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <>
    {contextHolder}
    <BrowserRouter>
      <Routes>
        {routes.map((route) => {
          const Page = route.page;

          const Layout = route.isShowHeader
            ? DefaultComponent
            : route.isShowAdminLayout
            ? AdminLayout
            : Fragment;

          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
