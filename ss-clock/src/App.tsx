// src/App.tsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import AlarmList from './components/AlarmList';
import AddAlarmButton from './components/AddAlarmButton';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './app/store';
import { addAlarm, toggleAlarm, Alarm } from './features/alarms/alarmSlice';

const App: React.FC = () => {
    const alarms = useSelector((state: RootState) => state.alarms.alarms);
    const dispatch = useDispatch();

    const handleToggleAlarm = (id: number) => {
        dispatch(toggleAlarm(id));
    };

    const handleAddAlarm = () => {
        const newAlarm: Alarm = {
            id: alarms.length + 1,
            time: '8:00 AM',
            label: 'New Alarm',
            repeat: ['M', 'T', 'W', 'T', 'F'],
            active: true,
        };
        dispatch(addAlarm(newAlarm));
    };

    const getNearestAlarm = () => {
        const now = new Date();
        let nearestAlarm: Alarm | null = null;
        let minDiff = Infinity;

        alarms.forEach(alarm => {
            if (alarm.active) {
                const [time, meridiem] = alarm.time.split(' ');
                let [hours, minutes] = time.split(':').map(Number);

                // Adjust hours based on AM/PM
                if (meridiem === 'PM' && hours !== 12) hours += 12;
                if (meridiem === 'AM' && hours === 12) hours = 0;

                const alarmDate = new Date(now);
                alarmDate.setHours(hours);
                alarmDate.setMinutes(minutes);
                alarmDate.setSeconds(0);
                alarmDate.setMilliseconds(0);

                // If the alarm time today has already passed, set it for tomorrow
                if (alarmDate < now) {
                    alarmDate.setDate(alarmDate.getDate() + 1);
                }

                const diff = alarmDate.getTime() - now.getTime();
                if (diff < minDiff) {
                    minDiff = diff;
                    nearestAlarm = alarm;
                }
            }
        });

        return nearestAlarm;
    };

    const nearestAlarm = getNearestAlarm();

    const formatTimeDifference = (diff: number) => {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return { hours, minutes };
    };

    const nearestAlarmTime = nearestAlarm ? formatTimeDifference(nearestAlarm.time) : null;

    return (
        <Container>
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                {nearestAlarm ? (
                    <>
                        <Typography variant="h4">
                            Alarm in {nearestAlarmTime?.hours} hours and {nearestAlarmTime?.minutes} minutes
                        </Typography>
                        <Typography variant="subtitle1">
                            {nearestAlarm?.time}, {nearestAlarm?.label}
                        </Typography>
                    </>
                ) : (
                    <Typography variant="h4">No active alarms</Typography>
                )}
            </Box>
            <AlarmList alarms={alarms} toggleAlarm={handleToggleAlarm} />
            <AddAlarmButton addAlarm={handleAddAlarm} />
        </Container>
    );
};

export default App;