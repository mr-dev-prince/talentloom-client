import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Discussion type
export interface Discussion {
  _id: string;
  userId: string;
  title: string;
  content: string;
  upvotes: number;
  public: boolean;
  createdAt: string;
  updatedAt: string;
}

// ✅ Redux state type
interface DiscussionState {
  discussions: Discussion[];
  discussion: Discussion | null;
  loading: boolean;
  error: string | null;
  sortBy: "upvotes" | "date";
}

// ✅ Initial state
const initialState: DiscussionState = {
  discussions: [],
  discussion: null,
  loading: false,
  error: null,
  sortBy: "date",
};

// ✅ Create Discussion
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
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/discussion`,
        discussionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create discussion"
      );
    }
  }
);

// ✅ Get all discussions
export const getDiscussions = createAsyncThunk(
  "discussion/getDiscussions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/discussion`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch discussions"
      );
    }
  }
);

// ✅ Get single discussion by ID
export const getDiscussionById = createAsyncThunk(
  "discussion/getDiscussionById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/discussion/${id}`
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch discussion"
      );
    }
  }
);

const discussionSlice = createSlice({
  name: "discussion",
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<"upvotes" | "date">) => {
      state.sortBy = action.payload;

      // Sorting logic
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
      // Create Discussion
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

      // Get all discussions
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

      // Get single discussion
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
      });
  },
});

export const { setSortBy } = discussionSlice.actions;
export default discussionSlice.reducer;
