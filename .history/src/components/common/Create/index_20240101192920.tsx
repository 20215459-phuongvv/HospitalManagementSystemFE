import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import { Field, InitField } from "../interfaces";
import { useModal } from "../../hooks/useModal";
import { AppDispatch } from "../../../redux";
import { useDispatch } from "react-redux";
import { ErrorMessage, Field as FieldForm, Form, Formik } from "formik";
import { FaImages, FaTimes } from "react-icons/fa";
import ConfirmModal from "../ConfirmModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Modify/Modify.scss";
import AutoComplete from "../AutoComplete";
import { parseISO } from "date-fns";
import { setLoading } from "../../../redux/features/loadingSlice";
import { setNotification } from "../../../redux/features/notificationSlice";
interface CreateProps {
  fields: Field[];
  handleSubmit: Function;
  closeCreateModal: Function;
  initFields: InitField[];
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
        dateFormat="dd/MM/yyyy HH:mm"
      />
      <ErrorMessage name={field.name} component="div" className="error" />
    </div>
  );
};
const DateDayInput = ({ field, form, ...props }) => {
  return (
    <div>
      <DatePicker
        {...field}
        {...props}
        selected={field.value}
        onChange={(val) => form.setFieldValue(field.name, val)}
        dateFormat="dd/MM/yyyy"
      />
      <ErrorMessage name={field.name} component="div" className="error" />
    </div>
  );
};
const Create: React.FC<CreateProps> = ({
  fields,
  handleSubmit,
  closeCreateModal,
  initFields,
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
    // Initialize based on existing values for update operation
    switch (field.type) {
      case "text":
      case "textarea":
        initialValues[field.fieldName] = ""; // You can set the default value for text and textarea
        break;
      case "image":
        initialValues[field.fieldName] = null; // You can set the default value for image
        break;
      case "datetime":
      case "dateday":
        initialValues[field.fieldName] = parseISO(new Date().toISOString()); // You can set the default value for date
        break;
      default:
        initialValues[field.fieldName] = "";
    }
  });
  initFields.forEach((field) => {
    initialValues[field.fieldName] = field.fieldValue;
  });
  console.log(initialValues);
  const handleScale = useCallback((textarea) => {
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, []);
  const handleEnter = () => {
    document.querySelectorAll(".autoScaleTextarea").forEach((textarea) => {
      handleScale(textarea);
    });
  };
  const handleSubmitClick = async (values) => {
    if (fields.some((field) => field.type === "image")) {
      const formData = new FormData();
      fields.forEach((field) => {
        if (field.type !== "image")
          formData.append(field.fieldName, values[field.fieldName]);
        else if (values[field.fieldName])
          formData.append(field.fieldName, values[field.fieldName]);
      });

      try {
        console.log(values);
        dispatch(setLoading(true));
        await handleSubmit(formData);
        dispatch(setLoading(false));
        dispatch(setNotification("success"));
        closeCreateModal();
      } catch (error) {
        dispatch(setNotification("error"));
        closeCreateModal();
      }
    } else {
      try {
        dispatch(setLoading(true));
        await handleSubmit(values);
        dispatch(setLoading(false));
        dispatch(setNotification("success"));
        closeCreateModal();
      } catch (error) {
        dispatch(setNotification("error"));
        closeCreateModal();
      }
    }
  };
  const imagePicker = useRef(null);
  const dispatch: AppDispatch = useDispatch();
  const renderField = (setFieldValue) => {
    const renderFields: ReactNode[] = [];
    fields.forEach((field) => {
      if (field.modifyDisplay) {
        if (field.type === "text") {
          if (field.choosen !== null) {
            // const renderChoosen = () => {
            //   return field.choosen.map((item: any) => {
            //     return (
            //       <li
            //         className="choosen-item"
            //         key={item.id}
            //         onClick={() => {
            //           console.log(field.fieldName, item.name);
            //           setFieldValue(field.fieldName, item.name);
            //           setFieldValue(
            //             field.fieldName.replace("Name", "Id"),
            //             item.id
            //           );
            //         }}
            //         onMouseDown={(e) => {
            //           // Prevent the input from losing focus
            //           e.preventDefault();
            //         }}
            //       >
            //         {item.name}
            //       </li>
            //     );
            //   });
            // };
            // renderFields.push(
            //   <div className="modal-data modal-modify-choosen">
            //     <label className="modal-label" htmlFor={field.fieldName}>
            //       {field.fieldDisplay}
            //     </label>
            //     <FieldForm
            //       type="text"
            //       name={field.fieldName}
            //       className="modal-input"
            //     />
            //     <div className="choosen-container">
            //       <ul className="choosen">{renderChoosen()}</ul>
            //     </div>
            //   </div>
            // );
            renderFields.push(
              <AutoComplete
                field={field}
                choosen={field.choosen}
                setFieldValue={setFieldValue}
                fieldValue={""}
              />
            );
          } else
            renderFields.push(
              <div className="modal-data">
                <label className="modal-label" htmlFor={field.fieldName}>
                  {field.fieldDisplay}
                </label>
                <FieldForm
                  type="text"
                  name={field.fieldName}
                  className="modal-input"
                />
              </div>
            );
        } else if (field.type === "datetime") {
          renderFields.push(
            <div className="modal-data">
              <label htmlFor={field.fieldName} className="modal-label">
                {field.fieldDisplay}
              </label>
              <FieldForm
                name={field.fieldName}
                className="modal-input"
                component={DateTimeInput}
              />
            </div>
          );
        } else if (field.type === "dateday") {
          renderFields.push(
            <div className="modal-data">
              <label htmlFor={field.fieldName} className="modal-label">
                {field.fieldDisplay}
              </label>
              <FieldForm
                name={field.fieldName}
                className="modal-input"
                component={DateDayInput}
              />
            </div>
          );
        } else if (field.type === "image") {
          renderFields.unshift(
            <div className="modal-data">
              <div className="overview-img-container modify-image-container">
                <label
                  htmlFor="get-image"
                  className="modal-label image-picker"
                  ref={imagePicker}
                >
                  <FaImages />
                </label>
                <div className="overview-img ">
                  <img
                    src={
                      "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
                    }
                    alt=""
                  />
                </div>
              </div>

              <input
                type="file"
                name="get-image"
                id="get-image"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (event.target.files && event.target.files[0]) {
                    setFieldValue(field.fieldName, event.target.files[0]);
                    (imagePicker.current! as any).classList.add("is-actived");
                  }
                }}
                style={{ display: "none" }}
              ></input>
            </div>
          );
        } else if (field.type === "textarea") {
          renderFields.push(
            <div className="modal-data" key={field.fieldName}>
              <label htmlFor={field.fieldName} className="modal-label">
                {field.fieldDisplay}
              </label>
              <FieldForm
                as="textarea"
                name={field.fieldName}
                className="modal-input autoScaleTextarea"
                onInput={() =>
                  handleScale(document.querySelector(".autoScaleTextarea"))
                }
                onKeyDown={handleEnter}
              />
            </div>
          );
        }
      }
    });
    return renderFields;
  };
  //   const handleSubmit = (values) => {
  //     // if (fields.some((field) => field.type === "image")) {
  //     //   const formData = new FormData();
  //     //   fields.forEach((field) => {
  //     //     if (field.type !== "image")
  //     //       formData.append(field.fieldName, values[field.fieldName]);
  //     //     else if (values[field.fieldName])
  //     //       formData.append(field.fieldName, values[field.fieldName]);
  //     //   });
  //     //   handleSubmit(formData);
  //     // } else handleSubmit(values);
  //     console.log(values);
  //   };
  useEffect(() => {
    const textarea = document.querySelector(".autoScaleTextarea");
    handleScale(textarea);
  }, []);
  return (
    <div className="modify modal-container" style={{ zIndex: 99999 }}>
      <div className="modal-wrapper">
        <div className="modal modify-modal">
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmitClick(values)}
          >
            {({ setFieldValue }) => (
              <Form>
                {renderField(setFieldValue)}
                <button type="submit" className="modal-button">
                  Tạo
                </button>
                <button
                  type="button"
                  className="modal-button"
                  onClick={() => handleCloseModify()}
                >
                  Hủy
                </button>
              </Form>
            )}
          </Formik>
          <FaTimes
            className="modal-close"
            onClick={() => handleCloseModify()}
          />
        </div>
        {isConfirmModal && (
          <ConfirmModal
            type="MODIFY"
            closeConfirmModal={closeConfirmModal}
            closeModifyModal={closeCreateModal}
            deleteFunction={null}
          />
        )}
      </div>
    </div>
  );
};
export default Create;
