// src/components/AlarmList.tsx
import React from 'react';
import { List } from '@mui/material';
import Alarm from './Alarm';
import { Alarm as AlarmType } from '../features/alarms/alarmSlice';

interface AlarmListProps {
    alarms: AlarmType[];
    toggleAlarm: (id: number) => void;
}

const AlarmList: React.FC<AlarmListProps> = ({ alarms, toggleAlarm }) => {
    return (
        <List>
            {alarms.map(alarm => (
                <Alarm key={alarm.id} alarm={alarm} toggleAlarm={toggleAlarm} />
            ))}
        </List>
    );
};

export default AlarmList;