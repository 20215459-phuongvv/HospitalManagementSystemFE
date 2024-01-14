import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchData } from "../../hooks/useFethData";
import { AppDispatch, RootState } from "../../../redux";
import { getDoctors } from "../../../redux/actions/doctor-actions";
import { getDepartments } from "../../../redux/actions/department-actions";
import { Field } from "../interfaces";
import Overview from "../Overview";
import "./Test.scss";
const Test = () => {
  const dispatch: AppDispatch = useDispatch();
  const isFetched = useFetchData(() => {
    return Promise.all([dispatch(getDepartments()), dispatch(getDoctors())]);
  });
  const handleDelete = () => {};
  const fields: Field[] = [
    {
      fieldName: "name",
      fieldDisplay: "Họ tên",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "text",
    },
    {
      fieldName: "departmentName",
      fieldDisplay: "Chuyên khoa",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: "department.departments",
      type: "text",
    },
    {
      fieldName: "departmentId",
      fieldDisplay: "Chuyên khoa",
      overviewDisplay: false,
      detailDisplay: false,
      modifyDisplay: false,
      choosen: null,
      type: "text",
    },
    {
      fieldName: "address",
      fieldDisplay: "Địa chỉ",
      overviewDisplay: false,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: "",
      type: "text",
    },
    {
      fieldName: "phoneNumber",
      fieldDisplay: "Số điện thoại",
      overviewDisplay: false,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: "",
      type: "text",
    },
    {
      fieldName: "gender",
      fieldDisplay: "Giới tính",
      overviewDisplay: false,
      detailDisplay: false,
      modifyDisplay: false,
      choosen: "",
      type: "text",
    },
    {
      fieldName: "image",
      fieldDisplay: "",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: "",
      type: "image",
    },
    {
      fieldName: "rating",
      fieldDisplay: "Đánh giá",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: false,
      choosen: "",
      type: "text",
    },
  ];
  const doctors = useSelector((state: RootState) => state.doctor.doctors);
  const renderDoctors = () => {
    return doctors.map((doctor) => {
      return (
        <Overview
          fields={fields}
          entity={doctor}
          handleDelete={handleDelete}
          openDetailEdit={true}
        />
      );
    });
  };
  return <ul className="test">{isFetched && renderDoctors()}</ul>;
};

export default Test;