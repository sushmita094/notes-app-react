import React, { useState } from "react";

const TaskCard = ({
  task,
  index,
  handleDeleteTask,
  handleChangeEditInput,
  handleFinishEditTask,
  editInputVal,
}) => {
  const [editMode, setEditMode] = useState(false);

  const saveEdits = (index) => {
    handleFinishEditTask(index);
    setEditMode(false);
  };

  return (
    <div className="task-card">
      {!editMode ? (
        <>
          <p className="task-name">{task}</p>
          <div>
            <button className="edit-task-btn" onClick={() => setEditMode(true)}>
              Edit
            </button>
            <button
              className="delete-task-btn"
              onClick={() => handleDeleteTask(index)}
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <form>
          <input
            placeholder="Edit"
            value={editInputVal}
            onChange={(e) => handleChangeEditInput(e)}
          />
          <button type="submit" onClick={(e) => saveEdits(index)}>
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default TaskCard;
