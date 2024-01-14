import React, { useState } from "react";
import { Field } from "../interfaces";
import { Prescription } from "../../../redux/features/prescriptionSlice";
import Medicine from "../Medicine";
import { useModal } from "../../hooks/useModal";
import { FaTimes } from "react-icons/fa";
import Modify from "../Modify";

interface PrescriptionDetailProps {
  prescription: Prescription;
  closeDetailModal: Function;
  handleDelete: Function;
  openDetailEdit: boolean;
  handleSubmit: Function;
}
const PrescriptionDetail: React.FC<PrescriptionDetailProps> = ({
  prescription,
  closeDetailModal,
  handleDelete,
  handleSubmit,
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
  const [state, setState] = useState({
    patientId: prescription.patientId,
    note: prescription.note,
    createdDay: prescription.createdDay,
    medicines: prescription.medicines,
  });
  const fields = [
    {
      fieldName: "note",
      fieldDisplay: "Ghi chú",
      overviewDisplay: false,
      detailDisplay: false,
      modifyDisplay: true,
      choosen: null,
      type: "textarea",
      viewDetail: null,
    },
  ];
  const handleModify = ({ id, values }) => {
    const newState = {
      ...state,
      note: values.note,
    };
    setState(newState);
  };
  console.log(state);
  const renderMedicines = () => {
    return prescription.medicines.map((medicine) => {
      return <Medicine medicine={medicine} openEdit={openDetailEdit} />;
    });
  };
  return (
    <>
      <div className="modal-container">
        <div className="modal-wrapper">
          <div className="modal">
            <p className="modal-item overview-item">
              <span className="modal-field overview-field">Bệnh nhân:</span>{" "}
              <span>{prescription.patientName}</span>
            </p>
            <p className="modal-item overview-item">
              <span className="modal-field overview-field">Bác sĩ:</span>{" "}
              <span>{prescription.doctorName}</span>
            </p>
            <p className="modal-item overview-item">
              <span className="modal-field overview-field">Ngày tạo:</span>{" "}
              <span>
                {prescription.createdDay.toLocaleDateString("vi", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
            </p>
            <ul className="medicines">{renderMedicines()}</ul>
            {openDetailEdit && (
              <button className="modal-button">Thêm thuốc</button>
            )}
            <p className="modal-item overview-item">
              <span className="modal-field overview-field">Lưu ý:</span>{" "}
              <span>{prescription.note}</span>
            </p>
            <FaTimes className="modal-close" onClick={closeDetailModal} />
            {openDetailEdit && (
              <>
                <button className="modal-button" onClick={openModify}>
                  Thay đổi ghi chú
                </button>
                <button className="modal-button" onClick={openConfirmModal}>
                  Xóa
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {isModifyOpen && (
        <Modify
          fields={fields}
          handleSubmit={handleModify}
          entity={prescription}
          closeModifyModal={closeModify}
        />
      )}
    </>
  );
};

export default PrescriptionDetail;
