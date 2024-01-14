import { createSlice } from "@reduxjs/toolkit"
import { getDoctorPatients, getPatient, getPatients } from "../actions/patient-actions"


export interface Patient {
    id: string,
    name: string,
    address: string,
    birthday: Date,
    job: string,
    phoneNumber: string,
    nation: string,
    gender: string
}

const initValues : {
    doctorPatients: Patient[],
    patient: Patient | null,
    patients: Patient[]
} = {
    doctorPatients: [],
    patient: null,
    patients: []
}

export const patientSlice = createSlice({
    name: 'patient',
    initialState: initValues,
    reducers: {
        setDoctorPatients: (state, action)=> {
            state.doctorPatients= action.payload
        },
        setPatient: (state, action)=> {
            state.patient = action.payload
        }

    },
    extraReducers(builder) {
        builder.addCase(getPatient.fulfilled, (state, action)=> {
            state.patient = action.payload
        })
        builder.addCase(getPatients.fulfilled, (state, action) => {
            state.patients = action.payload
        })
        builder.addCase(getDoctorPatients.fulfilled, (state, action) => {
            state.doctorPatients = action.payload
        })
    },
})

export const {setDoctorPatients, setPatient} = patientSlice.actions
export default patientSlice.reducer