import { Reminder } from '../classes/reminder';
import * as RemindersActions from './reminder.actions';

export interface ReminderState {
  reminders: Reminder[];
}

export interface AppState {
  remindersArray: ReminderState;
}

const initialState = {
  reminders: []
};

export function remindersReducer(state: ReminderState = initialState, action: RemindersActions.RemindersActions) {
    switch (action.type) {
      case RemindersActions.ADD_REMINDER:
        return {
          ...state,
          reminders: [...state.reminders, action.payload]
        };
      case RemindersActions.ADD_REMINDERS:
        return {
          ...state,
          reminders: [...state.reminders, ...action.payload]
        };
      case RemindersActions.UPDATE_REMINDER:
        if (!!action.payload.oldReminder && !!action.payload.newReminder){
          const updatedReminders = [...state.reminders];
          const index = updatedReminders.indexOf(action.payload.oldReminder);
          if (index > -1) {
            updatedReminders.splice(index, 1, action.payload.newReminder);
          }

          return {
            ...state,
            reminders: updatedReminders
          };
        }else{
          return state;
        }
      case RemindersActions.DELETE_REMINDER:
        return {
          ...state,
          reminders: state.reminders.filter((rm) => {
            return rm !== action.payload;
          })
        };
      case RemindersActions.DELETE_REMINDERS:
        return {
          ...state,
          reminders: state.reminders.filter((rm) => {
            return !action.payload.includes(rm);
          })
        };
        default:
        return state;
    }
}
