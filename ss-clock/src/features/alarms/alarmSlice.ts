// src/features/alarms/alarmSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface Alarm {
    id: number;
    time: string;
    label: string;
    repeat: string[];
    active: boolean;
}

interface AlarmState {
    alarms: Alarm[];
}

const initialState: AlarmState = {
    alarms: [
        { id: 1, time: '7:00 AM', label: 'Morning Alarm', repeat: ['M', 'T', 'W', 'T', 'F'], active: true },
        { id: 2, time: '8:00 AM', label: 'Workout Alarm', repeat: ['S', 'S'], active: false },
    ],
};

const alarmSlice = createSlice({
    name: 'alarms',
    initialState,
    reducers: {
        addAlarm: (state, action: PayloadAction<Alarm>) => {
            state.alarms.push(action.payload);
        },
        toggleAlarm: (state, action: PayloadAction<number>) => {
            const alarm = state.alarms.find(alarm => alarm.id === action.payload);
            if (alarm) {
                alarm.active = !alarm.active;
            }
        },
    },
});

export const { addAlarm, toggleAlarm } = alarmSlice.actions;

export const selectAlarms = (state: RootState) => state.alarms.alarms;

export default alarmSlice.reducer;