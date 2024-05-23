// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import alarmReducer from '../features/alarms/alarmSlice';

export const store = configureStore({
    reducer: {
        alarms: alarmReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;