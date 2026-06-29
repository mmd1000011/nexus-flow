// این اینترفیس را هم فرانت و هم بک اند می‌شناسند
export interface BaseEvent {
  id: string;
  type: string; // مثلاً: 'TASK_CREATED' یا 'USER_REGISTERED'
  payload: Record<string, any>; // دیتای اصلی رویداد به صورت JSON
  timestamp: Date;
}