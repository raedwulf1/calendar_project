import { Action } from '@ngrx/store';
import { Reminder } from '../classes/reminder';

export const ADD_REMINDER = 'ADD_REMINDER';
export const UPDATE_REMINDER = 'UPDATE_REMINDER';
export const DELETE_REMINDER = 'DELETE_REMINDER';
export const DELETE_REMINDERS = 'DELETE_REMINDERS';
export const ADD_REMINDERS = 'ADD_REMINDERS';

export class AddReminder implements Action{
  readonly type = ADD_REMINDER;
  constructor(public payload: Reminder){}
}

export class UpdateReminder implements Action{
  readonly type = UPDATE_REMINDER;
  constructor(public payload: {oldReminder: Reminder, newReminder: Reminder}){}
}

export class DeleteReminder implements Action{
  readonly type = DELETE_REMINDER;
  constructor(public payload: Reminder){}
}

export class DeleteReminders implements Action{
  readonly type = DELETE_REMINDERS;
  constructor(public payload: Reminder[]){}
}

export class AddReminders implements Action{
  readonly type = ADD_REMINDERS;
  constructor(public payload: Reminder[]){}
}

export type RemindersActions = AddReminder
| UpdateReminder
| DeleteReminder
| DeleteReminders
| AddReminders;
