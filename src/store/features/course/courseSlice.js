import { createSlice} from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name: 'course',
    initialState: {
        course: [],
    },
})

// export reducer
export default courseSlice.reducer

// export selectors
export const selectAllCourses = state => state.course.course