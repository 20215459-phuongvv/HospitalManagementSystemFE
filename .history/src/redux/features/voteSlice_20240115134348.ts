import { createSlice } from "@reduxjs/toolkit"
import { addVote, getDoctorVotes, updateVote } from "../actions/vote-actions"


export interface Vote {
    id: string,
    patientId: string,
    patientName: string,
    rating: number,
    content: string
}
const initValues : {
    doctorVotes: Vote[]
} = {
    doctorVotes: []
}

export const voteSlice = createSlice({
    name: 'vote',
    initialState: initValues,
    reducers: {
        setDoctorVotes: (state, action)=> {
            state.doctorVotes = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(getDoctorVotes.fulfilled, (state, action) => {
            state.doctorVotes = action.payload
        })
        builder.addCase(addVote.fulfilled, (state, action) => {
            state.doctorVotes = [...state.doctorVotes, action.payload]
        })
        builder.addCase(updateVote.fulfilled, (state, action)=> {
            state.doctorVotes = state.doctorVotes.map(vote => {
                if (vote.id !== action.payload.id) return vote
                else return action.payload
            })
        })
    },
})

export const {} = voteSlice.actions
export default voteSlice.reducer