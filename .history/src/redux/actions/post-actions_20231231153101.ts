import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HOST_URL } from "./config";
import { getPostsAPI } from "../fake-api/posts-api";



export const getPosts = createAsyncThunk(
    'get-posts',
    async (_, {rejectWithValue})=> {
        // const response = await axios.get(`${HOST_URL}/posts`);
        // if (response.status < 200 || response.status >= 300 )
        // {
        //     return rejectWithValue(response);
        // }
        return Promise.resolve(getPostsAPI());
    }
)

export const getPostsOfDoctor = createAsyncThunk(
    'get-posts-of-doctor',
    async (_, {rejectWithValue})=> {
        // const response = await axios.get(`${HOST_URL}/api/posts?doctorId=${doctorId}`);
        // if (response.status < 200 || response.status >= 300) {
        //     rejectWithValue(response);
        // }
        // return response.data;
        return Promise.resolve(getPostsAPI());
    }
)