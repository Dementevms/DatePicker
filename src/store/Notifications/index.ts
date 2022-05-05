import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  EntityState,
  Slice,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { getPosts } from "api";
import { Notification } from "types/common";

function wrap<T extends Record<string, unknown> = {}, N extends string = "">(
  name: N,
  builders: CallableFunction[]
): Slice<EntityState<T> & { loading: string }, {}, N> {
  // First, create the thunk
  const fetchNotifications = createAsyncThunk<T[]>(
    "notifications/get-notifications",
    async () => {
      const response = await getPosts();
      return response as T[];
    }
  );

  const adapter = createEntityAdapter<T>();

  return createSlice({
    name,
    initialState: adapter.getInitialState({ loading: "" }),
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchNotifications.rejected, (state, action) => {
        const { error } = action;
      });
      builders.map((fn) => fn(builder));
    },
  });
}

// First, create the thunk
export const fetchNotifications = createAsyncThunk<Notification[]>(
  "notifications/get-notifications",
  async () => {
    const response = await getPosts();
    return response as Notification[];
  }
);

// const adapter = createEntityAdapter<Notification>({});

type Builder<T> = ActionReducerMapBuilder<EntityState<T>>;

const rejected = (builder: Builder<Notification>) =>
  builder.addCase(fetchNotifications.rejected, (state, action) => {
    const { error } = action;
  });

// const notificationsSlice = createSlice({
//   name: "notifications",
//   initialState: adapter.getInitialState({ loading: "idle" }),
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchNotifications.fulfilled, (state, action) =>
//       adapter.addMany(state, action.payload)
//     );
//     builder.addCase(fetchNotifications.rejected, (state, action) => {
//       const { error } = action;
//     });
//   },
// });

// export default notificationsSlice;
