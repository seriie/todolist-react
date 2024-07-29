import React, { useState } from 'react';

function Task({ task, index, updateTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleCheckboxChange = (e) => {
    updateTask(index, { ...task, completed: e.target.checked });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateTask(index, { ...task, text: editedText });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTask(index);
  };

  return (
    <div className="task">
      <input type="checkbox" checked={task.completed} onChange={handleCheckboxChange} />
      {isEditing ? (
        <input type="text" value={editedText} onChange={(e) => setEditedText(e.target.value)} onBlur={handleSave} />
      ) : (
        <span onClick={handleEdit}>{task.text}</span>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Task;