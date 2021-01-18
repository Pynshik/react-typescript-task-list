import {ADD_TASK, DELETE_TASK, EDIT_TASK} from './types';
import {ActionsTypes} from './actions';

type InitialStateType = {
  tasks : InitialStateTaskType[]
}

export type InitialStateTaskType = {
  id: string,
  name: string,
  surname: string,
  email: string,
  from?: Date,
  to?: string,
  type?: string,
  report?: boolean,
  comment?: string
}

const initialState: InitialStateType = {
  tasks: [
    {id: "1", name: 'Petr', surname: 'Petrov', email: 'petr@mail.ru'},
    {id: "2", name: 'Ivan', surname: 'Ivanov', email: 'ivan@mail.ru'},
    {id: "3", name: 'Sergei', surname: 'Sergeev', email: 'sergei@mail.ru'},
  ],
};

export const tasksReducer = (state = initialState, action: ActionsTypes) => {
  switch (action.type) {
    case ADD_TASK:
      return {...state, tasks: state.tasks.concat(action.payload)};
    case DELETE_TASK:
      const result = window.confirm('Do you want to delete this task?');
      if (result) {
        let newTaskList = [...state.tasks];
        newTaskList = newTaskList.filter((task) => task.id !== action.payload);
        return {...state, tasks: newTaskList};
      }
      return state;
    case EDIT_TASK:
      const taskList = [...state.tasks];
      const indexOfTask = state.tasks.findIndex((task: InitialStateTaskType) => task.id === action.payload.id);
      taskList[indexOfTask] = action.payload;
      return {...state, tasks: taskList};
    default: return state;
  }
};
