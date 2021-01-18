import {tasksReducer} from './taskReducer';

export const rootReducer = tasksReducer;

type RootReducerType = typeof tasksReducer;
export type TasksStateType = ReturnType<RootReducerType>;

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never;
export type InferActionsTypes<T extends {[key: string]: (...args: any[])=>any}> = ReturnType<PropertiesTypes<T>>;

