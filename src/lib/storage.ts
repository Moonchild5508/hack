import type { Activity, AACBoard, VisualSchedule } from '@/types';

const STORAGE_KEYS = {
  ACTIVITIES: 'therapy_activities',
  AAC_BOARDS: 'therapy_aac_boards',
  SCHEDULES: 'therapy_schedules',
  LANGUAGE_SETTINGS: 'therapy_language_settings'
};

export const saveActivity = (activity: Activity): void => {
  const activities = getActivities();
  const index = activities.findIndex(a => a.id === activity.id);
  
  if (index >= 0) {
    activities[index] = activity;
  } else {
    activities.push(activity);
  }
  
  localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
};

export const getActivities = (): Activity[] => {
  const data = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
  return data ? JSON.parse(data) : [];
};

export const getActivityById = (id: string): Activity | undefined => {
  const activities = getActivities();
  return activities.find(a => a.id === id);
};

export const deleteActivity = (id: string): void => {
  const activities = getActivities().filter(a => a.id !== id);
  localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
};

export const saveAACBoard = (board: AACBoard): void => {
  const boards = getAACBoards();
  const index = boards.findIndex(b => b.id === board.id);
  
  if (index >= 0) {
    boards[index] = board;
  } else {
    boards.push(board);
  }
  
  localStorage.setItem(STORAGE_KEYS.AAC_BOARDS, JSON.stringify(boards));
};

export const getAACBoards = (): AACBoard[] => {
  const data = localStorage.getItem(STORAGE_KEYS.AAC_BOARDS);
  return data ? JSON.parse(data) : [];
};

export const getAACBoardById = (id: string): AACBoard | undefined => {
  const boards = getAACBoards();
  return boards.find(b => b.id === id);
};

export const deleteAACBoard = (id: string): void => {
  const boards = getAACBoards().filter(b => b.id !== id);
  localStorage.setItem(STORAGE_KEYS.AAC_BOARDS, JSON.stringify(boards));
};

export const saveSchedule = (schedule: VisualSchedule): void => {
  const schedules = getSchedules();
  const index = schedules.findIndex(s => s.id === schedule.id);
  
  if (index >= 0) {
    schedules[index] = schedule;
  } else {
    schedules.push(schedule);
  }
  
  localStorage.setItem(STORAGE_KEYS.SCHEDULES, JSON.stringify(schedules));
};

export const getSchedules = (): VisualSchedule[] => {
  const data = localStorage.getItem(STORAGE_KEYS.SCHEDULES);
  return data ? JSON.parse(data) : [];
};

export const getScheduleById = (id: string): VisualSchedule | undefined => {
  const schedules = getSchedules();
  return schedules.find(s => s.id === id);
};

export const deleteSchedule = (id: string): void => {
  const schedules = getSchedules().filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEYS.SCHEDULES, JSON.stringify(schedules));
};

export const clearAllData = (): void => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};
