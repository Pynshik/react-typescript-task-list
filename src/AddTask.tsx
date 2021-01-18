import {useState} from 'react';
import { InitialStateTaskType } from './redux/taskReducer';

type PropsType = {
  createTask: (task: InitialStateTaskType) => void,
}

const AddTask: React.FC<PropsType> = ({createTask}) => {
  const [OtherFieldsVisible, SetOtherFieldsVisible] = useState(true);

  function HandleAddBtn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const task: InitialStateTaskType =
      {
        id: Date.now().toString(),
        name: event.currentTarget['firstname'].value,
        surname: event.currentTarget['surname'].value,
        email: event.currentTarget['email'].value,
        from: new Date(event.currentTarget['from'].value),
        to: event.currentTarget['to'].value,
        type: event.currentTarget['type'].value,
        report: event.currentTarget['report'].checked,
        comment: event.currentTarget['comment'].value,
      };
    createTask(task);
  }

  function moreInfo(event: React.MouseEvent<HTMLInputElement>) {
    SetOtherFieldsVisible(!OtherFieldsVisible);
  }

  return (
    <div>
      <form className="form-1" onSubmit={HandleAddBtn}>
        <label>First name:
          <input name="firstname" required></input>
        </label>
        <label>Last name:
          <input name="surname" required></input>
        </label>
        <label>Email:
          <input type="email" name="email" required />
        </label>
        <label>from:
          <input defaultValue={new Date().toISOString().split('T')[0]} type="date" name="from" onKeyDown={(e) => e.preventDefault()} />
        </label>
        <label>to:
          <input defaultValue={new Date().toISOString().split('T')[0]} type="date" name="to" onKeyDown={(e) => e.preventDefault()} />
        </label>
        <label>type:&nbsp;
          <select name="type">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </label>

        <input className="inputBtn" type="button" value="more info" onClick={moreInfo} />

        <div hidden={OtherFieldsVisible}>
          <label className="checkbox">
            <input type="checkbox" name="report" />
            <div className="checkbox__text">make report</div>
          </label>
          <label>Comment:
            <textarea name="comment" />
          </label>
        </div>
        <input className="inputBtn" type="submit" value="Add" />
      </form>
    </div>
  );
};

export default AddTask;
