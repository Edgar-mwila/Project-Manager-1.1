import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import projectReducer from './slices/projectSlice.ts';
import userReducer from './slices/userSlice.ts';
import taskReducer from './slices/taskSlice.ts';
import chatReducer from './slices/chatSlice.ts';

export const store = configureStore({
  reducer: {
    project: projectReducer,
    user: userReducer,
    task: taskReducer,
    chat: chatReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
