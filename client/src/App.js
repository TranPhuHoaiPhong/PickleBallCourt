import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultComponent from "./components/UserComponent/DefaultComponent/DefaultComponent";
import AdminLayout from "./components/AdminComponent/AdminLayout/AdminLayout";
import { routes } from "./routes/index";
import * as UserServices from "./services/admin/userServices"
import {
  useQuery
} from '@tanstack/react-query'
import { message } from 'antd';
import { setMessageApi } from './components/UserComponent/Message/Message'; // đường dẫn đúng
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import * as UserService from "./services/users/authServices"
import { updateUser } from "./redux/slides/userSlide";
import { useDispatch } from "react-redux";


function App() {
  const dispatch = useDispatch()


  const fetchApi = async () => {
    try {
      const res = await UserServices.getAllUser()
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

   const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
   const [messageApi, contextHolder] = message.useMessage();

  // Gán cho toàn bộ app
  setMessageApi(messageApi);

  useEffect(() => {
    let storageData = localStorage.getItem('access-token')
    if(storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      const decoded = jwtDecode(storageData)
      console.log("decodeApp", decoded);
      if(decoded?._id) {
        handleGetDetailUser(decoded?._id, storageData)
      }
    }
    console.log("storageData", storageData);

  }, [])

  const handleGetDetailUser = async (id, token) => {
      const res = await UserService.getDetailUser(id, token)
      const { name, email, phone, _id } = res.data
      dispatch(updateUser({name, email, phone, _id}))
  }

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
