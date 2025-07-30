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
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import * as authUtils from "./utils/authUtils";


function App() {
  const dispatch = useDispatch()

   const [messageApi, contextHolder] = message.useMessage();

  // // Gán cho toàn bộ app
  setMessageApi(messageApi);

  useEffect(() => {
    const fetcDetailUser = async() =>{
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
  }, [])

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

  const clientId = "AffY-_4DDwR3-kTqn1_e1FYildsuD2lS9sqqTN65jrhASA3MWOg6YsMamsGFKPUhjlMMJ5o-uU-swFeJ";
  const clientId2 = process.env.REACT_APP_PAYPAL_CLIENT_ID;
  console.log("clientId2", clientId2);
  console.log("PayPal Client ID:", clientId)
  return (
    <>
    {contextHolder}
    <PayPalScriptProvider options={{ "client-id": clientId }}>
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
    </PayPalScriptProvider>
    </>
  );
}

export default App;
