import React, { useState } from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import SidebarComponent from "../SidebarComponent/SidebarComponent";

const AdminLayout = ({ children }) => {
  const [isShowSidebar, setIsShowSidebar] = useState(false);

  return (
    <>
      <div style={{ display: "flex" }}>
        <SidebarComponent isShowSidebar={isShowSidebar} />
        <div style={{ width: "100%" }}>
          <HeaderComponent
            toggleSidebar={() => setIsShowSidebar((prev) => !prev)}
          />

          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
