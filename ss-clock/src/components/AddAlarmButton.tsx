// src/components/AddAlarmButton.tsx
import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface AddAlarmButtonProps {
    addAlarm: () => void;
}

const AddAlarmButton: React.FC<AddAlarmButtonProps> = ({ addAlarm }) => {
    return (
        <Fab color="primary" aria-label="add" onClick={addAlarm} sx={{ position: 'fixed', bottom: 16, right: 16 }}>
            <AddIcon />
        </Fab>
    );
};

export default AddAlarmButton;