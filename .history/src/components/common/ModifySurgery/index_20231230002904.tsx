import React from "react";
import { Surgery } from "../../../redux/features/surgerySlice";
import { Field, Formik } from "formik";
import { AppDispatch } from "../../../redux";
import { useDispatch } from "react-redux";
interface ModifySurgeryProps {
  surgery: Surgery;
  closeModifyModal: Function;
}
const ModifySurgery: React.FC<ModifySurgeryProps> = ({
  surgery,
  closeModifyModal,
}) => {
  const initialValues = {
    doctorName: surgery.doctorName,
    patientName: surgery.patientName,
    doctorId: surgery.doctorId,
    patientId: surgery.patientId,
    expectedTime: surgery.expectedTime,
    content: surgery.content,
    time: surgery.time,
  };
  const dispatch: AppDispatch = useDispatch();
  const handleChange = (values) => {};
  return (
    <div className="modal-container">
      <div className="modal">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleChange(values)}
        >
          <label htmlFor="doctorName">Doctor Name</label>
          <Field type="text" id="doctorName" name="doctorName" />
        </Formik>
      </div>
    </div>
  );
};

export default ModifySurgery;
