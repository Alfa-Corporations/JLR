import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // aquí irán los reducers (slices)
  }
});

// 🔹 Tipos automáticos
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
