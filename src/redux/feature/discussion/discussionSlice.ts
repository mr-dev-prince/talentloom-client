/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { notifyError, notifySuccess, ROOT_URL } from "../../../utils/common";
import type { CommentType, DiscussionState } from "../../../types/common";

const initialState: DiscussionState = {
  discussions: [],
  discussion: null,
  loading: false,
  error: null,
  sortBy: "date",
};

// CREATE_COMMENT thunk
export const createComment = createAsyncThunk<
  CommentType,
  { discussionId: string; content: string },
  { rejectValue: string }
>(
  "discussion/createComment",
  async ({ discussionId, content }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${ROOT_URL}/comment`,
        { discussionId, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      notifySuccess("Comment posted !");
      return res.data.comment;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create comment"
      );
    }
  }
);

// TOGGLE_UPVOTE thunk
export const toggleUpvote = createAsyncThunk<
  { discussionId: string; upvotes: number; hasUpvoted: boolean },
  { discussionId: string },
  { rejectValue: string }
>("discussion/toggleUpvote", async ({ discussionId }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${ROOT_URL}/upvote`,
      { discussionId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    notifySuccess(res.data.message);
    return res.data;
  } catch (error: any) {
    notifyError(error.response?.data?.message || "Failed to toggle upvote");
    return rejectWithValue(
      error.response?.data?.message || "Failed to toggle upvote"
    );
  }
});

// CREATE_DISCUSSION thunk
export const createDiscussion = createAsyncThunk(
  "discussion/createDiscussion",
  async (
    discussionData: {
      title: string;
      content: string;
      public: boolean;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${ROOT_URL}/discussion`, discussionData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      notifySuccess("Discussion created !");
      return res.data;
    } catch (error: any) {
      notifyError(
        error.response?.data?.message || "Failed to create discussion"
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed to create discussion"
      );
    }
  }
);

// GET_DISCUSSIONS thunk
export const getDiscussions = createAsyncThunk(
  "discussion/getDiscussions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${ROOT_URL}/discussion`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch discussions"
      );
    }
  }
);

// GET_DISCUSSION_BY_ID thunk
export const getDiscussionById = createAsyncThunk(
  "discussion/getDiscussionById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${ROOT_URL}/discussion/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch discussion"
      );
    }
  }
);

// DISCUSSION SLICE
const discussionSlice = createSlice({
  name: "discussion",
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<"upvotes" | "date">) => {
      state.sortBy = action.payload;
      if (state.sortBy === "upvotes") {
        state.discussions = [...state.discussions].sort(
          (a, b) => b.upvotes - a.upvotes
        );
      } else {
        state.discussions = [...state.discussions].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder

      // createDiscussion cases

      .addCase(createDiscussion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDiscussion.fulfilled, (state, action) => {
        state.loading = false;
        state.discussions.unshift(action.payload);
      })
      .addCase(createDiscussion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // getDiscussions cases

      .addCase(getDiscussions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDiscussions.fulfilled, (state, action) => {
        state.loading = false;
        state.discussions = action.payload;
      })
      .addCase(getDiscussions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // getDiscussionById cases

      .addCase(getDiscussionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDiscussionById.fulfilled, (state, action) => {
        state.loading = false;
        state.discussion = action.payload;
      })
      .addCase(getDiscussionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // upvote cases

      .addCase(toggleUpvote.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleUpvote.fulfilled, (state, action) => {
        state.loading = false;
        const { discussionId, upvotes } = action.payload;
        const discussion = state.discussions.find(
          (d) => d._id === discussionId
        );
        if (discussion) {
          discussion.upvotes = upvotes;
        }
      })
      .addCase(toggleUpvote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error toggling upvote";
      })

      // comment cases

      .addCase(createComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        const discussion = state.discussions.find(
          (d) => d._id === action.payload._id
        );

        console.log("the discussion", discussion);
        if (discussion) {
          discussion.comments.push(action.payload);
        }
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error posting comment";
      });
  },
});

export const { setSortBy } = discussionSlice.actions;
export default discussionSlice.reducer;
