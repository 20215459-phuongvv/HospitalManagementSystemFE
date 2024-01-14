import React from "react";
import "./Navbar.scss";
import { useModal } from "../../../components/hooks/useModal";
const Navbar = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  return (
    <div className="nav">
      <div className="container">
        <div className="nav-content">
          <div className="nav-logo"></div>
          <ul className="nav-list">
            <li className="nav-item">Home</li>
            <li className="nav-item">Services</li>
            <li className="nav-item">About us</li>
            <li className="nav-item">Contact us</li>
            <li className="nav-item">Blog</li>
            <li className="nav-login" onClick={openModal}>
              Đăng nhập
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;