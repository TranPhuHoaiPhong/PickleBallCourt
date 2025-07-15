import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultComponent from "./components/UserComponent/DefaultComponent/DefaultComponent";
import AdminLayout from "./components/AdminComponent/AdminLayout/AdminLayout";
const { routes } = require("./routes/index");

function App() {
  return (
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
  );
}

export default App;
