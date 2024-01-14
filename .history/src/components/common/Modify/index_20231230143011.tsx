import React, { ReactNode } from "react";
import { Field } from "../interfaces";
import { useModal } from "../../hooks/useModal";
import { AppDispatch } from "../../../redux";
import { useDispatch } from "react-redux";
import { ErrorMessage, Field as FieldForm, Form, Formik } from "formik";
import { FaTimes } from "react-icons/fa";
import ConfirmModal from "../ConfirmModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  let initialValues: any = {};
  fields.forEach((field) => {
    console.log(field.fieldName);
    initialValues[field.fieldName] = entity[field.fieldName];
  });
  const dispatch: AppDispatch = useDispatch();
  const renderField = () => {
    const renderFields: ReactNode[] = [];
    return fields.forEach((field) => {
      if (field.modifyDisplay) {
        if (field.type === "text") {
          renderFields.push(
            <div className="modal-data">
              <label className="modal-label" htmlFor={field.fieldName}>
                Tên
              </label>
              <FieldForm
                type="text"
                name={field.fieldName}
                className="modal-input"
              />
            </div>
          );
        } else if (field.type === "date") {
          renderFields.push(
            <div className="modal-data">
              <label htmlFor={field.fieldName} className="modal-label">
                Ngày sinh
              </label>
              <FieldForm
                name={field.fieldName}
                className="modal-input"
                component={DateTimeInput}
              />
            </div>
          );
        }
      }
      return renderFields;
    });
  };
  const handleSubmit = (values) => {};
  return (
    <div className="modify modal-container">
      <div className="modal modify-modal">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleSubmit(values)}
        >
          <Form>
            {renderField()}
            <button type="submit" className="modal-button">
              Thay đổi
            </button>
            <button
              type="button"
              className="modal-button"
              onClick={() => handleCloseModify()}
            >
              Hủy
            </button>
          </Form>
        </Formik>
        <FaTimes className="modal-close" onClick={handleCloseModify} />
      </div>
      {isConfirmModal && (
        <ConfirmModal
          type="MODIFY"
          closeConfirmModal={closeConfirmModal}
          closeModifyModal={closeModifyModal}
          deleteFunction={null}
        />
      )}
    </div>
  );
};

export default Modify;