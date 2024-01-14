import { Field } from "../common/interfaces";

export const doctorFields : Field[] = [
    {
      fieldName: "name",
      fieldDisplay: "Họ tên",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "text",
      viewDetail: null,
    },
    {
      fieldName: "departmentName",
      fieldDisplay: "Chuyên khoa",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "text",
      viewDetail: null,
    },
    {
      fieldName: "departmentId",
      fieldDisplay: "Chuyên khoa",
      overviewDisplay: false,
      detailDisplay: false,
      modifyDisplay: false,
      choosen: null,
      type: "text",
      viewDetail: null,
    },
    {
      fieldName: "address",
      fieldDisplay: "Địa chỉ",
      overviewDisplay: false,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "text",
      viewDetail: null,
    },
    {
      fieldName: "birthDay",
      fieldDisplay: "Ngày sinh",
      overviewDisplay: false,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "dateday",
      viewDetail: null,
    },
    {
      fieldName: "phoneNumber",
      fieldDisplay: "Số điện thoại",
      overviewDisplay: false,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "text",
      viewDetail: null,
    },
    {
      fieldName: "gender",
      fieldDisplay: "Giới tính",
      overviewDisplay: false,
      detailDisplay: false,
      modifyDisplay: false,
      choosen: null,
      type: "text",
      viewDetail: null,
    },
    {
      fieldName: "image",
      fieldDisplay: "",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "image",
      viewDetail: null,
    },
    {
      fieldName: "rating",
      fieldDisplay: "Đánh giá",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: false,
      choosen: null,
      type: "text",
      viewDetail: null,
    },
  ];

export const patientFields : Field[]= [
    {
      fieldName: "name",
      fieldDisplay: "Họ tên",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "text",
      viewDetail: null
    },
    {
      fieldName: "address",
      fieldDisplay: "Địa chỉ",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "text",
      viewDetail: null
    },
    {
      fieldName: "birthday",
      fieldDisplay: "Ngày sinh",
      overviewDisplay: false,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "dateday",
      viewDetail: null
    },
    {
      fieldName: "job",
      fieldDisplay: "Nghề nghiệp",
      overviewDisplay: false,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "text",
      viewDetail: null
    },
    {
      fieldName: "phoneNumber",
      fieldDisplay: "Số điện thoại",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "text",
      viewDetail: null
    },
    {
      fieldName: "nation",
      fieldDisplay: "Dân tộc",
      overviewDisplay: false,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "text",
      viewDetail: null
    },
    {
      fieldName: "gender",
      fieldDisplay: "Giới tính",
      overviewDisplay: false,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "select.MALE.FEMALE",
      viewDetail: null
    },
  ];

export const addVoteFields : Field[] = [
    {
        fieldName: "rating",
        fieldDisplay: "Số sao",
        overviewDisplay: true,
        detailDisplay: true,
        modifyDisplay: true,
        choosen: [1,2,3,4,5],
        type: "text",
        viewDetail: null
      },
      {
        fieldName: "content",
        fieldDisplay: "Nội dung",
        overviewDisplay: true,
        detailDisplay: true,
        modifyDisplay: true,
        choosen: null,
        type: "textarea",
        viewDetail: null
      },
      {
        fieldName: "doctorId",
        fieldDisplay: "Số sao",
        overviewDisplay: false,
        detailDisplay: false,
        modifyDisplay: false,
        choosen: null,
        type: "text",
        viewDetail: null
      }
]
const treatmentPlanFields : Field[] = [
    {
        fieldName: "doctorId",
        fieldDisplay: "aa",
        overviewDisplay: false,
        detailDisplay: false,
        modifyDisplay: false,
        choosen: null,
        type: "text",
        viewDetail: null
      },


    ]