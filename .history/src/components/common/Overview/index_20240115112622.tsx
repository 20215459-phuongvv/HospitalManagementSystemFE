import React, { ReactNode } from "react";
import { Field } from "../interfaces";
import { useModal } from "../../hooks/useModal";
import Detail from "../Detail";
import "./Overview.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
interface OverviewProps {
  fields: Field[];
  entity: any;
  handleDelete: Function;
  openDetailEdit: boolean;
  handleSubmit: Function;
}
const Overview: React.FC<OverviewProps> = ({
  fields,
  entity,
  handleDelete,
  openDetailEdit,
  handleSubmit,
}) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const user = useSelector((state: RootState) => state.user.user);
  const renderEntity = () => {
    const render: ReactNode[] = [];
    fields.forEach((field) => {
      if (
        field.overviewDisplay &&
        ((user!.role === "DOCTOR" && field.fieldName !== "doctorName") ||
          (user!.role === "PATIENT" && field.fieldName !== "patientName"))
      )
        if (field.type !== "image")
          render.push(
            <p className="modal-item overview-item">
              <span className="modal-field overview-field">
                {field.fieldDisplay}:
              </span>{" "}
              <span>
                {!field.type.includes("date")
                  ? entity[field.fieldName]
                  : field.type === "dateday"
                  ? entity[field.fieldName].toLocaleDateString("vi", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : entity[field.fieldName].toLocaleDateString("vi", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
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
        <Detail
          fields={fields}
          entity={entity}
          closeDetailModal={closeModal}
          handleDelete={handleDelete}
          openDetailEdit={openDetailEdit}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default Overview;
