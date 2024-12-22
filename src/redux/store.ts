import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/slice/authSlice';
import themeReducer from '@/redux/slice/themeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
  }
})

export type IRootState = ReturnType<typeof store.getState>
export default store;