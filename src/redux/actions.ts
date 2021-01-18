import {ADD_TASK, DELETE_TASK, EDIT_TASK} from './types';
import {InferActionsTypes} from './rootReducer';
import {InitialStateTaskType} from './taskReducer';

export type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  addTask: (newTask: InitialStateTaskType) => {
    return ({
      type: ADD_TASK,
      payload: newTask,
    } as const);
  },
  deleteTask: (id: string) => {
    return ({
      type: DELETE_TASK,
      payload: id,
    } as const);
  },
  editTask: (task: InitialStateTaskType) => {
    return ({
      type: EDIT_TASK,
      payload: task,
    } as const);
  },
}
