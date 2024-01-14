import React, { useState } from "react";
import { Surgery as SurgeryV2 } from "../../../redux/features/surgerySlice";
// import { Surgery as SurgeryProps } from "../../../redux/features/surgerySlice";
import "./Surgery.scss";
import SurgeryDetail from "../SurgeryDetail";
interface SurgeryProps {
  surgery: SurgeryV2;
}
const Surgery: React.FC<SurgeryProps> = ({ surgery }) => {
  const [openSurgeryDetail, setOpenSurgeryDetail] = useState(false);
  return (
    <li
      className="surgery-item"
      key={surgery.id}
      onClick={() => setOpenSurgeryDetail(true)}
    >
      <span className="surgery-item-doctor">Bác sĩ: {surgery.doctorName}</span>
      <span className="surgery-item-patient">
        Bệnh nhân: {surgery.patientName}
      </span>
      <span className="surgery-item-day">
        Ngày: {surgery.time.toDateString()}
      </span>
      <span className="surgery-item-content">Nội dung: {surgery.content}</span>
      <span className="surgery-item-expected">
        Thời gian dự kiến: {surgery.expectedTime.getHours()}
      </span>
      {openSurgeryDetail && <SurgeryDetail surgery={surgery} />}
    </li>
  );
};

export default Surgery;