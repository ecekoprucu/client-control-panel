import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/slice/authSlice';
import drawerReducer from '@/redux/slice/drawerSlice';
import themeReducer from '@/redux/slice/themeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    drawer: drawerReducer,
    theme: themeReducer,
  }
})

export type IRootState = ReturnType<typeof store.getState>
export default store;