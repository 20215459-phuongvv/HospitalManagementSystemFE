import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux";
import { useModal } from "../../hooks/useModal";
import PatientDetail from "../Patient/PatientDetail";
import { doctorFields, patientFields } from "../../utils/constants";
import DoctorDetail from "../Doctors/DoctorDetail";
import { deleteDoctor } from "../../../redux/actions/doctor-actions";
interface ViewDetailProps {
  patientId: string | null;
  doctorId: string | null;
}
const ViewDetail: React.FC<ViewDetailProps> = ({ patientId, doctorId }) => {
  const entity =
    patientId !== null
      ? useSelector((state: RootState) =>
          state.patient.patients.filter((patient) => patient.id === patientId)
        )[0]
      : useSelector((state: RootState) =>
          state.doctor.doctors.filter((doctor) => doctor.id === doctorId)
        )[0];
  const { isModalOpen, closeModal, openModal } = useModal();
  const dispatch: AppDispatch = useDispatch();
  const handleDeleteDoctor = async (id: string) => {
    await dispatch(deleteDoctor(id));
  };
  return (
    <>
      <span onClick={openModal} style={{ cursor: "pointer" }}>
        {entity.name}
      </span>
      {isModalOpen && patientId !== null && (
        <PatientDetail
          entity={entity}
          fields={patientFields}
          id={null}
          closeDetailModal={closeModal}
          handleDelete={handleDeleteDoctor}
          openDetailEdit={false}
          handleSubmit={undefined}
        />
      )}
      {isModalOpen && doctorId !== null && (
        <DoctorDetail
          fields={doctorFields}
          entity={entity}
          closeDetailModal={closeModal}
          id={null}
          handleDelete={undefined}
          handleSubmit={undefined}
        />
      )}
    </>
  );
};

export default ViewDetail;
