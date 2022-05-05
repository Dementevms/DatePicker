import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { getPosts } from "api";
import { Post } from "types/common";

// First, create the thunk
export const fetchPosts = createAsyncThunk("posts/get-posts", async () => {
  const response = await getPosts();
  return response as Post[];
});

interface PostState {
  entities: Post[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState = {
  entities: [],
  loading: "idle",
} as PostState;

// Then, handle actions in your reducers:
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      // Add user to the state array
      state.entities = action.payload;
    });
  },
});

export default postsSlice;
