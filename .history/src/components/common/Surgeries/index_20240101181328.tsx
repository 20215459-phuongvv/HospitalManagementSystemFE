import React, { useState } from "react";
import { useFetchData } from "../../hooks/useFethData";
import { AppDispatch, RootState } from "../../../redux";
import { useDispatch, useSelector } from "react-redux";
import {
  SurgeryRequest,
  deleteSurgery,
  getSurgeries,
  updateSurgery,
} from "../../../redux/actions/surgery-actions";
import "./Surgeries.scss";
import Surgery from "../Surgery";
import { Field } from "../interfaces";
import { getDoctors } from "../../../redux/actions/doctor-actions";
import { getPatients } from "../../../redux/actions/patient-actions";
import Overview from "../Overview";
import { IoIosAddCircle } from "react-icons/io";
import Create from "../Create";
import { useModal } from "../../hooks/useModal";
interface SurgeriesProps {
  role: "ADMIN" | "DOCTOR";
}
const Surgeries: React.FC<SurgeriesProps> = ({ role }) => {
  const [type, setType] = useState("DAY");
  const dispatch: AppDispatch = useDispatch();
  const isFetched = useFetchData(() => {
    return Promise.all([
      dispatch(getSurgeries()),
      dispatch(getDoctors()),
      dispatch(getPatients()),
    ]);
  });
  const {
    isModalOpen: isOpenCreateModal,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal();
  const user = useSelector((state: RootState) => state.user.user);
  const surgeries =
    role === "ADMIN"
      ? useSelector((state: RootState) => state.surgery.surgeries)
      : useSelector((state: RootState) =>
          state.surgery.surgeries.filter(
            (surgery) => surgery.doctorId === user!.id
          )
        );
  const doctors = useSelector((state: RootState) => state.doctor.doctors);
  const patients = useSelector((state: RootState) => state.patient.patients);
  const surgeriesToday = surgeries.filter((surgery) => {
    const surgeryDate = new Date(surgery.time);

    return (
      surgeryDate.getDate() === new Date().getDate() &&
      surgeryDate.getMonth() === new Date().getMonth() &&
      surgeryDate.getFullYear() === new Date().getFullYear()
    );
  });
  const handleDelete = async (id: string) => {
    await dispatch(deleteSurgery(id));
  };
  const handleSubmit = async (data: {
    id: string;
    surgery: SurgeryRequest;
  }) => {
    await dispatch(updateSurgery(data));
  };
  const fields: Field[] = [
    {
      fieldName: "doctorName",
      fieldDisplay: "Bác sĩ",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: doctors,
      type: "text",
    },
    {
      fieldName: "doctorId",
      fieldDisplay: "Bác sĩ",
      overviewDisplay: false,
      detailDisplay: false,
      modifyDisplay: false,
      choosen: null,
      type: "text",
    },
    {
      fieldName: "patientName",
      fieldDisplay: "Bệnh nhân",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: patients,
      type: "text",
    },
    {
      fieldName: "time",
      fieldDisplay: "Thời gian",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "datetime",
    },
    {
      fieldName: "content",
      fieldDisplay: "Nội dung",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "textarea",
    },
    {
      fieldName: "expectedTime",
      fieldDisplay: "Thời gian dự kiến",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "text",
    },
  ];
  const renderSurgeries = () => {
    const renderSurgeries = type === "DAY" ? surgeriesToday : surgeries;
    return renderSurgeries.map((surgery) => {
      return (
        <Overview
          fields={fields}
          entity={surgery}
          handleDelete={handleDelete}
          handleSubmit={handleSubmit}
          openDetailEdit={role === "ADMIN" ? true : false}
        />
      );
    });
  };
  return (
    <div className="surgeries">
      <ul className="surgeries-top-list">
        <li
          className={`surgeries-top-item ${type === "DAY" ? "actived" : ""}`}
          onClick={() => setType("DAY")}
        >
          Trong ngày
        </li>
        <li
          className={`surgeries-top-item ${type === "WEEK" ? "actived" : ""}`}
          onClick={() => setType("WEEK")}
        >
          Trong tuần
        </li>
      </ul>
      {role === "ADMIN" && (
        <div className="doctors-create create-button" onClick={openCreateModal}>
          <IoIosAddCircle />
        </div>
      )}
      {isFetched && <ul className="surgery-list">{renderSurgeries()}</ul>}
      {isOpenCreateModal && (
        <Create
          fields={fields}
          handleSubmit={handleSubmit}
          closeCreateModal={closeCreateModal}
          initFields={[]}
        />
      )}
    </div>
  );
};

export default Surgeries;