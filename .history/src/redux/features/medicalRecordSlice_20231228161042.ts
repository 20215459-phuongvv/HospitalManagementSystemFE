import { createSlice } from "@reduxjs/toolkit";
import { getMedicalRecord } from "../actions/medicalRecord-actions";

export interface MedicalRecord {
    doctorId: string,
    doctorName: string,
    patientId: string,
    patientName: string,
    departmentId: string,
    departmentName: string,
    BHYTCode: string,
    inDay: Date,
    outDay: Date,
    inDayDiagnose: string,
    outDayDiagnose: string,
    medicalHistory: string,
    diseaseProgress: string,
    testResults: string,
    hospitalDischargeStatus: string,
    stayType: string,
    note: string
}

const initValues: {
    medicalRecord: MedicalRecord | null;
} = {
    medicalRecord: null
};

export const medicalRecordSlice = createSlice({
    name: 'medicalRecord',
    initialState: initValues,
    reducers: {
        setMedicalRecord: (state, action)=> {
            state.medicalRecord = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(getMedicalRecord.fulfilled, (state, action)=> {
            state.medicalRecord = action.payload
        })
    },
})