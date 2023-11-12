import { createSlice} from "@reduxjs/toolkit";

const sectionSlice = createSlice({
    name: 'section',
    initialState: {
        section: [],
    },
})

// export reducer
export default sectionSlice.reducer

// export selectors
export const selectAllSection = state => state.section.section