import {useState} from 'react';
import {Route, Link, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import TaskItem from './TaskItem';
import AddTask from './AddTask';
import EditTask from './EditTask';
import {actions} from './redux/actions';
import {TasksStateType} from './redux/rootReducer';
import {InitialStateTaskType} from './redux/taskReducer';

type MapStatePropsType = {
  tasks: Array<InitialStateTaskType>,
};

type MapDispatchPropsType = {
  addTask: (newTask: InitialStateTaskType) => void,
  deleteTask: (id: string) => void,
  editTask: (task: InitialStateTaskType) => void,
}

type OwnProps = {};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnProps;

const App: React.FC<PropsType> = (props) => {
  const history = useHistory();
  const [EditableTask, SetEditableTask] = useState<InitialStateTaskType | null>(null);

  function CreateTask(newTask: InitialStateTaskType) {
    props.addTask(newTask);
    history.push('/list');
  }

  function HandleEditBtn(id: string) {
    const task = props.tasks.find((task: InitialStateTaskType) => task.id === id);
    task !== undefined ? SetEditableTask(task) : history.push('/list');
    history.push('/edit');
  }

  function UpdateTask(task: InitialStateTaskType) {
    props.editTask(task);
    history.push('/list');
  }


  function DeleteTask(id: string) {
    props.deleteTask(id);
    history.push('/list');
  }

  return (
    <div className="App">
      <ul className="link">
        <li>
          <Link to="/add">Create task</Link>
        </li>
        <li>
          <Link to="/list">Task list</Link>
        </li>
      </ul>
      <Route path="/edit">
        <EditTask editableTask={EditableTask} updateTask={UpdateTask} />
      </Route>
      <Route path="/add">
        <AddTask createTask={CreateTask} />
      </Route>
      <ul className="wrapper">
        {props.tasks ?
          props.tasks.map((task: InitialStateTaskType, index: number) => {
            return (
              <Route path="/list">
                <TaskItem
                  edit={HandleEditBtn}
                  deleteTask={DeleteTask}
                  task={task}
                  index={index}
                  key={task.id}
                />
              </Route>
            );
          }) :
          'There is no tasks.'}
      </ul>
    </div>
  );
};

const mapStatetoProps = (state: TasksStateType): MapStatePropsType => {
  return {
    tasks: state.tasks,
  };
};

const mapDispatchToProps = {
  addTask: actions.addTask,
  deleteTask: actions.deleteTask,
  editTask: actions.editTask,
};

export default connect<MapStatePropsType, MapDispatchPropsType, OwnProps, TasksStateType>(mapStatetoProps, mapDispatchToProps)(App);
