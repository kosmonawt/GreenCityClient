import { HabitItemDto } from './HabitItemDto';

export class HabitAssignDto {
    id: number;
    acquired: boolean;
    suspended: boolean;
    createDateTime: Date;
    habit: HabitItemDto; 
    userId: number;
    duration: number;
    workingDays: number;
    habitStreak: number;
    lastEnrollmentDate: Date;
  }
  