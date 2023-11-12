import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: [], // Initial state of comments
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    addComment(state, action) {
      state.comments.push(action.payload); 
    },
  },
});

export const { addComment } = commentSlice.actions;
export default commentSlice.reducer;
