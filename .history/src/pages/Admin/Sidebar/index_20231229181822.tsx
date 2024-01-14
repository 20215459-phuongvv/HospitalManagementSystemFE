import React from "react";
import Logo from "../../../assets/images/logo.png";
const Sidebar = () => {
  return (
    <div className="admin-sidebar sidebar">
      <div className="sidebar-top">
        <img src={Logo} alt="" />
      </div>
    </div>
  );
};

export default Sidebar;