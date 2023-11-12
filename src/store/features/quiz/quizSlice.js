import { createSlice} from "@reduxjs/toolkit";

const quizSlice = createSlice({
    name: 'quiz',
    initialState: {
        quiz: [],
    },
})

// export reducer
export default quizSlice.reducer

// export selectors
export const selectAllQuiz = state => state.quiz.quiz