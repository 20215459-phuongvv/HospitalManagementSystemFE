import React from "react";
import { Surgery as SurgeryV2 } from "../../../redux/features/surgerySlice";
// import { Surgery as SurgeryProps } from "../../../redux/features/surgerySlice";
interface SurgeryProps {
  surgery: SurgeryV2;
}
const Surgery: React.FC<SurgeryProps> = ({ surgery }) => {
  return <li className="surgery-item"></li>;
};

export default Surgery;
