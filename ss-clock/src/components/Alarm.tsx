// src/components/Alarm.tsx
import React from 'react';
import { ListItem, ListItemText, Switch, Typography } from '@mui/material';
import { Alarm as AlarmType } from '../features/alarms/alarmSlice';

interface AlarmProps {
    alarm: AlarmType;
    toggleAlarm: (id: number) => void;
}

const Alarm: React.FC<AlarmProps> = ({ alarm, toggleAlarm }) => {
    const handleToggle = () => {
        toggleAlarm(alarm.id);
    };

    return (
        <ListItem>
            <ListItemText
                primary={alarm.label}
                secondary={
                    <>
                        <Typography component="span" variant="body2">
                            {alarm.time}
                        </Typography>
                        <Typography component="span" variant="body2" color="textSecondary">
                            {alarm.repeat.join(', ')}
                        </Typography>
                    </>
                }
            />
            <Switch
                edge="end"
                onChange={handleToggle}
                checked={alarm.active}
                inputProps={{ 'aria-labelledby': `switch-list-label-${alarm.id}` }}
            />
        </ListItem>
    );
};

export default Alarm;