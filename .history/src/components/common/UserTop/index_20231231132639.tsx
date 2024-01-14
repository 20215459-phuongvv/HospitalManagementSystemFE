import React from "react";
import { User } from "../../../redux/features/userSlice";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import "./UserTop.scss";
import { AppDispatch } from "../../../redux";
import { useDispatch } from "react-redux";
import { Logout } from "../../../redux/actions/auth-actions";
import { useModal } from "../../hooks/useModal";
interface UserTopProps {
  user: User;
}
const UserTop: React.FC<UserTopProps> = ({ user }) => {
  const dispatch: AppDispatch = useDispatch();
  const handleLogout = async () => {
    await dispatch(Logout());
  };
  const { isModalOpen, openModal, closeModal } = useModal();
  return (
    <div className="usertop">
      <div className="usertop-content">
        <span className="usertop-content-name">{user.name}</span>
        <div className="usertop-content-img">
          <img src={user.avatar} alt="" />
          <IoIosArrowDropdownCircle className="usertop-icon" />
        </div>
        <ul className="usertop-choosen">
          <li className="usertop-item">Đổi mật khẩu</li>
          <li className="usertop-item" onClick={handleLogout}>
            Đăng xuất
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserTop;