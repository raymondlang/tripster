import { createSlice } from "@reduxjs/toolkit";
import {
  RECEIVE_CHAT_ERRORS,
  RECEIVE_COMMENT,
} from "../actions/comment_actions";

const initialState = [];

const commentErrorsSlice = createSlice({
  name: "commentErrors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(RECEIVE_CHAT_ERRORS, (state, action) => {
        return action.payload.errors;
      })
      .addCase(RECEIVE_COMMENT, () => {
        return initialState;
      });
  },
});

export default commentErrorsSlice.reducer;
