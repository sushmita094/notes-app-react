import React, { useState } from "react";

import editIcon from "./../assets/edit.svg";
import deleteIcon from "./../assets/delete.svg";
import notCheckedIcon from "./../assets/blank-check-box.svg";
import checkedIcon from "./../assets/check-box.svg";

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
    <div className="task-card">
      {!editMode ? (
        <>
          <p className="task-name">{task.name}</p>
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
            <button
              className="mark-btn"
              onClick={() => handleMarkComplete(index)}
            >
              {/* Mark {task.completed ? "Incomplete" : "Complete"} */}
              <img
                src={task.completed ? checkedIcon : notCheckedIcon}
                alt="mark task"
              />
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
          <button type="submit" onClick={() => saveEdits(index)}>
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default TaskCard;
