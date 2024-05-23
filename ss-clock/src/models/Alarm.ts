// src/models/Alarm.ts
export interface Alarm {
    id: number;
    time: string;
    label: string;
    repeat: string[];
    active: boolean;
}