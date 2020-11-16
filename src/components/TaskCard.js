import React, { useState } from "react";

import editIcon from "./../assets/edit.svg";
import deleteIcon from "./../assets/delete.svg";
import tick from "./../assets/tick.svg";

const TaskCard = ({
  task,
  index,
  handleEditTask,
  handleDeleteTask,
  handleChangeEditInput,
  handleFinishEditTask,
  editInputVal,
  handleMarkComplete,
}) => {
  const [editMode, setEditMode] = useState(false);

  const startEdit = (index) => {
    setEditMode(true);
    handleEditTask(index);
  };

  const saveEdits = (index) => {
    handleFinishEditTask(index);
    setEditMode(false);
  };

  return (
    <div className={`task-card ${task.completed && "completed"}`}>
      {!editMode ? (
        <>
          <div className="task-card-left">
            <button
              className="mark-btn"
              onClick={() => handleMarkComplete(index)}
            >
              <div className={`circle ${task.completed && "circle-fill"}`}>
                <img src={tick} alt="mark task" />
              </div>
            </button>
            <p className="task-name">{task.name}</p>
          </div>

          <div>
            <button className="edit-task-btn" onClick={() => startEdit(index)}>
              <img src={editIcon} alt="edit task" />
            </button>
            <button
              className="delete-task-btn"
              onClick={() => handleDeleteTask(index)}
            >
              <img src={deleteIcon} alt="delete task" />
            </button>
          </div>
        </>
      ) : (
        <form className="edit-task-form">
          <input
            placeholder="Edit"
            value={editInputVal}
            onChange={(e) => handleChangeEditInput(e)}
          />
          <button
            className="secondary-button"
            type="submit"
            onClick={() => saveEdits(index)}
          >
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default TaskCard;
