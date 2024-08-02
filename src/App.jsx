import React, { useState, useEffect, useRef } from 'react';
import './style/App.css';
import './style/tailwind.css';
import './style/dark-mode.css';
import './style/slider.css';
import TaskList from './TaskList';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const checkboxRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const loadFromLocalStorage = () => {
      try {
        console.log('Loading from localStorage...');
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = storedTheme || (prefersDark ? 'dark-mode' : 'light-mode');
        console.log('Stored theme:', theme);
        setIsDarkMode(theme === 'dark-mode');
        document.body.classList.toggle('dark-mode', theme === 'dark-mode');
        document.body.classList.toggle('light-mode', theme === 'light-mode');

        const storedTasks = localStorage.getItem('tasks');
        const storedPoints = localStorage.getItem('points');
        const storedLevel = localStorage.getItem('level');

        console.log('Stored tasks:', storedTasks);
        console.log('Stored points:', storedPoints);
        console.log('Stored level:', storedLevel);

        if (storedTasks) setTasks(JSON.parse(storedTasks));
        if (storedPoints) setPoints(JSON.parse(storedPoints));
        if (storedLevel) setLevel(JSON.parse(storedLevel));
      } catch (error) {
        console.error('Error loading from localStorage:', error);
        // Set default values in case of error
        setTasks([]);
        setPoints(0);
        setLevel(0);
      }
    };

    loadFromLocalStorage();
  }, []);  

  useEffect(() => {
    // Hitung point dan level berdasarkan tasks
    const newPoints = tasks.filter(task => task.completed).length;
    const newLevel = Math.floor(newPoints / 5);
    
    // Set state untuk points dan level
    setPoints(newPoints);
    setLevel(newLevel);
    
    // Simpan tasks, points, dan level ke localStorage
    console.log('Saving to localStorage...');
    console.log('Tasks:', tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('points', JSON.stringify(newPoints));
    localStorage.setItem('level', JSON.stringify(newLevel));
  }, [tasks]);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = isDarkMode;
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    const theme = newIsDarkMode ? 'dark-mode' : 'light-mode';
    document.body.classList.toggle('dark-mode', newIsDarkMode);
    document.body.classList.toggle('light-mode', !newIsDarkMode);
    localStorage.setItem('theme', theme);
  };

  const addTask = (taskText) => {
    const newTasks = [...tasks, { text: taskText, completed: false }];
    console.log('Adding task:', newTasks);
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((task, i) => i !== index);
    console.log('Deleting task:', newTasks);
    setTasks(newTasks);
  };

  const deleteAllTasks = () => {
    console.log('Deleting all tasks');
    setTasks([]);
  };

  const toggleTask = (index) => {
    const newTasks = tasks.map((task, i) => i === index ? { ...task, completed: !task.completed } : task);
    console.log('Toggling task:', newTasks);
    setTasks(newTasks);
  };

  function TodoText() {
    const handleReload = () => {
      window.location.reload();
    };
    return (
      <h1 className='left-10 cursor-pointer relative text-green-400 font-bold text-[30px]' onClick={handleReload}>To-do List</h1> 
    );
  }

  function CountText() {
    return (
      <div className='count flex-1 flex justify-center m-0 p-0 gap-5'>
        <p className='text-slate-700 font-bold text-2xl hover:text-sky-300 transition-colors duration-300 ease-in'>Level: {level}</p>
        <p className='text-slate-700 font-bold text-2xl hover:text-sky-300 transition-colors duration-300 ease-in'>Points: {points}</p>
      </div>
    );
  }

  const styles = {
    themeToggle: {
      display: 'flex',
    },
    switch: {
      display: 'flex',
      position: 'absolute',
      width: '44px',
      height: '24px',
    },
    switchInput: {
      opacity: 0,
    },
    slider: {
      cursor: 'pointer',
      position: 'absolute',
      backgroundColor: '#fff',
      inset: 0,
      borderRadius: '100px',
      transition: 'all .3s',
      border: '2px solid #CBD5E1',
    },
  };

  return (
    <div className="App">
      <div className='App-header transition-all duration-[300ms] bg-slate-200 top-0 w-[100%] pt-10 pb-10 z-10 fixed'>
        <div className='App-header-container flex items-center'>
          <TodoText />
          <CountText />
          <div style={styles.themeToggle} className="theme-toggle ml-auto mr-[100px] relative -top-3">
            <label style={styles.switch} className="switch" title="Toggle themes">
              <input 
                style={styles.switchInput} 
                type="checkbox" 
                ref={checkboxRef}
                onChange={toggleTheme}
              />
              <span style={styles.slider} className="slider"></span>
            </label>
          </div>
        </div>
      </div>
      <TaskList 
        tasks={tasks}
        addTask={addTask}
        deleteTask={deleteTask}
        deleteAllTasks={deleteAllTasks}
        toggleTask={toggleTask}
      />
    </div>
  );
}

export default App;
