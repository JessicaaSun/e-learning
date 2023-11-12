import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import courseReducer from "./features/course/courseSlice";
import authReducer from "./features/auth/authSlice";
import sectionReducer from "./features/section/sectionSlice";
import quizReducer from "./features/quiz/quizSlice";
import commentReducer from "./features/comment/commentSlice"
import certificateReducer from "./features/certificate/certificateSlice";

const store = configureStore({
  reducer: {
    // reducerPath is the name of the slice default is "api"
    [apiSlice.reducerPath]: apiSlice.reducer,
    course: courseReducer,
    auth: authReducer,
    section: sectionReducer,
    quiz: quizReducer,
    certificate: certificateReducer,
    comment : commentReducer
  },
  // this need for rtks query to work with cache and other stuff
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
  // devTools must set to false in production
  devTools: true,
});

export default store;
