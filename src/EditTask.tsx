import { InitialStateTaskType } from "./redux/taskReducer";

type PropsType = {
  updateTask: (task: InitialStateTaskType) => void,
  editableTask: InitialStateTaskType | null,
}

const EditTask: React.FC<PropsType> = ({updateTask, editableTask}) => {
  function HandleEditBtn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (editableTask === null) return;
    const task =
        {
          id: editableTask.id,
          name: event.currentTarget['firstname'].value,
          surname: event.currentTarget['surname'].value,
          email: event.currentTarget['email'].value,
          from: new Date(event.currentTarget['from'].value),
          to: event.currentTarget['to'].value,
          type: event.currentTarget['type'].value,
          report: event.currentTarget['report'].checked,
          comment: event.currentTarget['comment'].value,
        };
    updateTask(task);
  }
  return (
    <div>
      <form className="form-1" onSubmit={HandleEditBtn}>
        <label>First name:
          <input name="firstname" defaultValue={editableTask ? editableTask.name : ''}></input>
        </label>
        <label>Last name:
          <input name="surname" defaultValue={editableTask ? editableTask.surname : ''}></input>
        </label>
        <label>Email:
          <input type="email" name="email" defaultValue={editableTask ? editableTask.email : ''} />
        </label>
        <label>from:
          <input 
            type="date" 
            name="from" 
            defaultValue={editableTask ? (editableTask.from ? editableTask.from.toJSON().substring(0, 10) : new Date().toISOString().split('T')[0]) : new Date().toISOString().split('T')[0]}
            onKeyDown={(e) => e.preventDefault()} />
        </label>
        <label>to:
          <input 
            type="date" 
            name="to" 
            defaultValue={editableTask ? (editableTask.to ? editableTask.to : new Date().toISOString().split('T')[0]) : new Date().toISOString().split('T')[0]}
            onKeyDown={(e) => e.preventDefault()} />
        </label>
        <label>type:&nbsp;
          <select name="type" defaultValue={editableTask ? editableTask.type : '1'}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </label>
        <label className="checkbox">
          <input type="checkbox" name="report" defaultChecked={editableTask ? editableTask.report : false} />
          <div className="checkbox__text">make report</div>
        </label>
        <label>Comment:
          <textarea name="comment" defaultValue={editableTask ? editableTask.comment : 'no comment'} />
        </label>

        <input className="inputBtn" type="submit" value="Save" />
      </form>
    </div>
  );
}

export default EditTask;
