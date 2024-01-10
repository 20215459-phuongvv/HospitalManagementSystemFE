import React from "react";
import { Field } from "../interfaces";
import { useModal } from "../../hooks/useModal";
import { AppDispatch } from "../../../redux";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
interface ModifyProps {
  fields: Field[];
  entity: any;
  closeModifyModal: Function;
}
const DateTimeInput = ({ field, form, ...props }) => {
  return (
    <div>
      <DatePicker
        {...field}
        {...props}
        selected={field.value}
        onChange={(val) => form.setFieldValue(field.name, val)}
        showTimeSelect
        timeIntervals={15} // Adjust as needed
        dateFormat="MMMM d, yyyy h:mm aa"
      />
      <ErrorMessage name={field.name} component="div" className="error" />
    </div>
  );
};
const Modify: React.FC<ModifyProps> = ({
  fields,
  entity,
  closeModifyModal,
}) => {
  const {
    isModalOpen: isConfirmModal,
    openModal: openConfirmModal,
    closeModal: closeConfirmModal,
  } = useModal();
  const handleCloseModify = () => {
    openConfirmModal();
  };
  let initialValues: any;
  fields.forEach((field) => {
    initialValues[field.fieldName] = entity[field.fieldName];
  });
  const dispatch: AppDispatch = useDispatch();
  const handleSubmit = (values) => {};
  return (
    <div className="modify modal-container">
      <div className="modal modify-modal">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleSubmit(values)}
        ></Formik>
      </div>
    </div>
  );
};

export default Modify;
