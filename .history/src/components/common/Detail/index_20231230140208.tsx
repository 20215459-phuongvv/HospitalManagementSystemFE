import React, { ReactNode } from "react";
import { Field } from "../interfaces";
import { useModal } from "../../hooks/useModal";
import { FaTimes } from "react-icons/fa";
import ConfirmModal from "../ConfirmModal";
import Modify from "../Modify";
interface DetailProps {
  fields: Field[];
  entity: any;
  closeDetailModal: Function;
  handleDelete: Function | null;
  openDetailEdit: boolean;
}
const Detail: React.FC<DetailProps> = ({
  fields,
  entity,
  closeDetailModal,
  handleDelete,
  openDetailEdit,
}) => {
  const {
    isModalOpen: isModifyOpen,
    openModal: openModify,
    closeModal: closeModify,
  } = useModal();
  const {
    isModalOpen: isConfirmModal,
    openModal: openConfirmModal,
    closeModal: closeConfirmModal,
  } = useModal();
  const renderEntity = () => {
    const render: ReactNode[] = [];
    fields.forEach((field) => {
      if (field.detailDisplay)
        if (field.type !== "image")
          render.push(
            <p className="modal-item">
              <span className="modal-field">{field.fieldDisplay}:</span>{" "}
              <span>{entity[field.fieldName]}</span>
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
    <div className="detail modal-container">
      {!isModifyOpen && (
        <div className="detail-modal modal">
          {renderEntity()}
          {openDetailEdit && (
            <>
              <button className="surgery-detail-modify" onClick={openModify}>
                Sửa
              </button>
              <button
                className="surgery-detail-delete"
                onClick={openConfirmModal}
              >
                Xóa
              </button>
            </>
          )}
          <FaTimes className="modal-close" onClick={closeDetailModal} />
        </div>
      )}
      {isModifyOpen && (
        <Modify
          fields={fields}
          entity={entity}
          closeModifyModal={closeModify}
        />
      )}
      {isConfirmModal && (
        <ConfirmModal
          type="DELETE"
          closeConfirmModal={closeConfirmModal}
          closeModifyModal={null}
          deleteFunction={handleDelete}
        />
      )}
    </div>
  );
};

export default Detail;
