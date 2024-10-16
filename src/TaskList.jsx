import React, { useState } from 'react';
import './style/task-list.css';

const TaskList = ({ tasks, addTask, deleteTask, deleteAllTasks, toggleTask, completeAllTasks, discompleteAllTasks }) => {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      addTask(newTask);
      setNewTask('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const allTaskAreCompleted = tasks.every(task => task.completed);

  const completeAllTask = () => {
    completeAllTasks(); // Panggil fungsi di App.jsx
  }
  
  const discompletedAllTask = () => {
    discompleteAllTasks(); // Panggil fungsi di App.jsx
  }
  

  const pendingTasksCount = tasks.filter(task => !task.completed).length;

  return (
    <div className="container px-[20px] pb-[20px] pt-[40px] bg-slate-800 shadow-custom max-w-[600px] mb-0 mt-[200px] mx-auto">
      <h1 className="todolist text-slate-100 text-4xl font-bold text-center">Your To-Do List</h1>
      <div id="newtask" className='mt-5 w-full flex items-center'>
        <input 
          type="text" 
          className='focus:outline-green-500 focus:bg-green-100 bg-slate-100 min-w-0 flex-1 p-[10px] border border-grey-800 rounded-[4px]' 
          placeholder="Enter task.." 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyUp={handleKeyPress}
        />
        <button onClick={handleAddTask} className='focus:outline-slate-100 py-[11px] px-[20px] bg-green-400 rounded-[4px] text-slate-900'>Add</button>
      </div>
      <div id="wrapping-tasks">
        <div className='task-text-and-complete-all flex justify-between items-center'>
          <h1 className="task-list text-slate-100 font-bold text-3xl mt-5">Task List</h1>
          <div className={`complete-all px-[16px] py-[12px] rounded-md font-bold cursor-pointer text-slate-50 ${allTaskAreCompleted? 'bg-red-500 hover:bg-red-600' : 'bg-sky-500 hover:bg-sky-600'}`} onClick={allTaskAreCompleted ? discompletedAllTask : completeAllTask}>{allTaskAreCompleted ? 'Discomplete All' : 'Completed All'}</div>
        </div>
        <hr className='border-t-2 border-stone-400 mt-1 mb-5'/>
        <ul className="tasks list-none p-0">
          {tasks.map((task, index) => (
            <li key={index} className="task-item bg-slate-100 mb-[20px] p-2 font-bold rounded-[4px] mb-2 flex items-center justify-between">
              <div className='flex items-center'>
                <input type="checkbox" checked={task.completed} onChange={() => toggleTask(index)} className='checkbox mr-3'/>
                <span className={task.completed ? 'line-through text-gray-500' : 'cursor-pointer'}>{task.text}</span>
              </div>
              <button onClick={() => deleteTask(index)} className='bg-red-500 hover:bg-red-600 rounded-[50%] p-2 text-slate-100 flex items-center justify-center'>
                <i className="fas fa-trash"></i>
              </button>
            </li>
          ))}
        </ul>
        <div className='bottom -mt-[20px]'>
            <span className="pending-tasks text-slate-100">You have <span className="tasksCount text-red-500">{pendingTasksCount}</span> pending tasks</span>
            <button onClick={deleteAllTasks} className="deleteAll hover:bg-red-600 hover:animate-shake bg-red-500 py-[10px] px-[20px] rounded-[4px] relative left-[10px] text-slate-100 mt-5">Delete All</button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;