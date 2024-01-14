import { createAsyncThunk } from "@reduxjs/toolkit";
import { getVotesOfDoctorAPI } from "../fake-api/vote-api";
import { HOST_URL } from "./config";
import axios from "axios";


export const getDoctorVotes = createAsyncThunk(
    'get-dotor-votes',
    async (doctorId: string,{rejectWithValue} ) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(`${HOST_URL}/api/votes/doctor?doctorId=${doctorId}`, {
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