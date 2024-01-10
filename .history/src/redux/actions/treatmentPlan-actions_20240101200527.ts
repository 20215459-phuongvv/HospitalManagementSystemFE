import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HOST_URL } from "./config";


export const getTreatmentPlanOfPatients = createAsyncThunk(
    'get',
    async (patientId) => {

    }
)

export const createTreatmentPlan = createAsyncThunk(
    'create-treatment',
    async (data: any, {rejectWithValue}) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(`${HOST_URL}/api/treatment_plans`, data,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >=300) {
            rejectWithValue(response);
        }
        return response.data;
    }
)

export const updateTreatmentPlan = createAsyncThunk(
    'update-treatment-plans',
    async (data: {
        id: string,
        value: any
    }, {rejectWithValue}) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.put(`${HOST_URL}/api/treatment_plans/${data.id}`, data.value,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >=300) {
            rejectWithValue(response);
        }
        return response.data;
    }
)

export const deleteTreatmentPlan = createAsyncThunk(
    'delete-treatment',
    async (id: string, {rejectWithValue}) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.delete(`${HOST_URL}/api/medical_records/${id}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >=300) {
            rejectWithValue(response);
        }
        return id;
    }
)