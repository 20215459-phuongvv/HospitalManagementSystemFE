import React from "react";
import { Field } from "../interfaces";
import { Prescription } from "../../../redux/features/prescriptionSlice";
import Medicine from "../Medicine";
import { useModal } from "../../hooks/useModal";

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
  const renderMedicines = () => {
    return prescription.medicines.map((medicine) => {
      return <Medicine medicine={medicine} openEdit={openDetailEdit} />;
    });
  };
  return (
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
          <p className="modal-item overview-item">
            <span className="modal-field overview-field">Lưu ý:</span>{" "}
            <span>{prescription.note}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionDetail;
