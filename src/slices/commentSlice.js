import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as CommentAPIUtil from "../util/comment_api_util";

export const fetchAllComments = createAsyncThunk(
  "comments/fetchAllComments",
  async (tripId, { rejectWithValue }) => {
    try {
      const comments = await CommentAPIUtil.fetchAllComments(tripId);
      return comments;
    } catch (error) {
      console.log("hello");
      return rejectWithValue(error.message);
    }
  }
);

export const fetchComment = createAsyncThunk(
  "comments/fetchComment",
  async (commentId, { rejectWithValue }) => {
    try {
      const comment = await CommentAPIUtil.fetchComment(commentId);
      return comment;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (data, { rejectWithValue }) => {
    try {
      const comment = await CommentAPIUtil.createComment(data);
      return comment.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async (data, { rejectWithValue }) => {
    try {
      const comment = await CommentAPIUtil.updateComment(data);
      return comment;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId, { rejectWithValue }) => {
    try {
      await CommentAPIUtil.deleteComment(commentId);
      return commentId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState: {},
  reducers: {
    receiveAllComments: (state, action) => {
      return action.payload.comments;
    },
    receiveComment: (state, action) => {
      state[action.payload.comment._id] = action.payload.comment;
    },
    receiveNewComment: (state, action) => {
      state[action.payload.comment._id] = action.payload.comment;
    },
    // receiveErrors: (state, action) => {
    //   // Handle errors if needed
    // },
    removeComment: (state, action) => {
      delete state[action.payload.commentId];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllComments.fulfilled, (state, action) => {
        console.log(action.payload);
        const commentsArray = action.payload.data; // The payload is already an array of comments
        return commentsArray.reduce((result, comment) => {
          result[comment._id] = comment;
          return result;
        }, {});
      })
      .addCase(fetchComment.fulfilled, (state, action) => {
        state[action.payload.comment._id] = action.payload.comment;
      })
      .addCase(createComment.pending, (state) => {
        state.isCreatingComment = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state[action.payload.comment._id] = action.payload.comment;
        state.isCreatingComment = false;
      })
      .addCase(createComment.rejected, (state) => {
        state.isCreatingComment = false;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state[action.payload.comment._id] = action.payload.comment;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        delete state[action.payload];
      });
  },
});

export const {
  receiveAllComments,
  receiveComment,
  receiveNewComment,
  receiveErrors,
  removeComment,
} = commentSlice.actions;

export default commentSlice.reducer;
