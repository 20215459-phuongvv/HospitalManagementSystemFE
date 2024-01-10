import { ReactNode } from "react";
import { useModal } from "../../hooks/useModal";
import { Prescription } from "../../../redux/features/prescriptionSlice";
import Medicine from "../Medicine";
import PrescriptionDetail from "../PrescriptionDetail";

interface AppoinmentProps {
  prescription: Prescription;
  handleDelete: Function;
  openDetailEdit: boolean;
  handleSubmit: Function;
  role: "DOCTOR" | "PATIENT";
}
const Prescription: React.FC<AppoinmentProps> = ({
  prescription,
  handleDelete,
  openDetailEdit,
  handleSubmit,
  role,
}) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const renderMedicines = () => {
    return prescription.medicines.map((medicine) => {
      return (
        <Medicine
          medicine={medicine}
          openEdit={role === "DOCTOR" ? true : false}
        />
      );
    });
  };
  return (
    <>
      <li className="overview" onClick={openModal}>
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
      </li>
      {isModalOpen && (
        <PrescriptionDetail
          prescription={prescription}
          closeDetailModal={closeModal}
          handleDelete={handleDelete}
          openDetailEdit={role === "DOCTOR" ? false : true}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};
export default Prescription;
