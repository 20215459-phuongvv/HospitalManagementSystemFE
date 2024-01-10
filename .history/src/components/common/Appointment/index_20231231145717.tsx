import React, { ReactNode } from "react";
import { Field } from "../interfaces";
import { useModal } from "../../hooks/useModal";
import Detail from "../Detail";
import "../Overview/Overview.scss";
import AppointmentDetail from "./AppointmentDetail";
interface AppoinmentProps {
  fields: Field[];
  entity: any;
  handleDelete: Function;
  openDetailEdit: boolean;
  handleSubmit: Function;
  role: "DOCTOR" | "PATIENT";
}
const Appointment: React.FC<AppoinmentProps> = ({
  fields,
  entity,
  handleDelete,
  openDetailEdit,
  handleSubmit,
}) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const renderEntity = () => {
    const render: ReactNode[] = [];
    fields.forEach((field) => {
      if (field.overviewDisplay)
        if (field.type !== "image")
          render.push(
            <p className="modal-item overview-item">
              <span className="modal-field overview-field">
                {field.fieldDisplay}:
              </span>{" "}
              <span>
                {!field.type.includes("date")
                  ? entity[field.fieldName]
                  : entity[field.fieldName].toLocaleDateString("vi", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
              </span>
            </p>
          );
        else
          render.unshift(
            <div className="overview-img-container">
              <div className="overview-img">
                <img src={entity[field.fieldName]} alt="" />
              </div>
            </div>
          );
    });
    return render;
  };
  return (
    <>
      <li className="overview" onClick={openModal}>
        {renderEntity()}
      </li>
      {isModalOpen && (
        <AppointmentDetail
          fields={fields}
          entity={entity}
          closeDetailModal={closeModal}
          handleDelete={handleDelete}
          openDetailEdit={openDetailEdit}
          handleSubmit={handleSubmit}
          role={role}
        />
      )}
    </>
  );
};
export default Appointment;
