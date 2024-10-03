// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios'; // Import Axios
// import './style/App.css';
// import './style/tailwind.css';
// import './style/dark-mode.css';
// import './style/slider.css';
// import TaskList from './TaskList';
// import Auth from './auth/auth';

// function App() {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const checkboxRef = useRef(null);
//   const [tasks, setTasks] = useState([]);
//   const [points, setPoints] = useState(0);
//   const [level, setLevel] = useState(0);
//   const [isAuth, setIsAuth] = useState(false); // Status autentikasi

//   useEffect(() => {
//     const loadFromLocalStorage = () => {
//       try {
//         const storedTheme = localStorage.getItem('theme');
//         const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//         const theme = storedTheme || (prefersDark ? 'dark-mode' : 'light-mode');
//         setIsDarkMode(theme === 'dark-mode');
//         document.body.classList.toggle('dark-mode', theme === 'dark-mode');
//         document.body.classList.toggle('light-mode', theme === 'light-mode');
//       } catch (error) {
//         console.error('Error loading theme from localStorage:', error);
//       }
//     };

//     loadFromLocalStorage();
//   }, []);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get('http://localhost:9000/todos');
//         const tasksFromServer = response.data;
//         setTasks(tasksFromServer);

//         // Hitung point dan level berdasarkan tasks
//         const newPoints = tasksFromServer.filter(task => task.completed).length;
//         const newLevel = Math.floor(newPoints / 5);
//         setPoints(newPoints);
//         setLevel(newLevel);
//       } catch (error) {
//         console.error('Error fetching tasks from backend:', error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   const toggleTheme = () => {
//     const newIsDarkMode = !isDarkMode;
//     setIsDarkMode(newIsDarkMode);
//     const theme = newIsDarkMode ? 'dark-mode' : 'light-mode';
//     document.body.classList.toggle('dark-mode', newIsDarkMode);
//     document.body.classList.toggle('light-mode', !newIsDarkMode);
//     localStorage.setItem('theme', theme);
//   };

//   const addTask = async (taskText) => {
//     try {
//       const response = await axios.post('http://localhost:9000/todos', { text: taskText });
//       const newTask = response.data;
//       setTasks([...tasks, newTask]);
//     } catch (error) {
//       console.error('Error adding task:', error);
//     }
//   };

//   const deleteTask = async (id) => {
//     try {
//       await axios.delete(`http://localhost:9000/todos/${id}`);
//       setTasks(tasks.filter(task => task.id !== id));
//     } catch (error) {
//       console.error('Error deleting task:', error);
//     }
//   };

//   const deleteAllTasks = async () => {
//     try {
//       for (const task of tasks) {
//         await axios.delete(`http://localhost:9000/todos/${task.id}`);
//       }
//       setTasks([]);
//     } catch (error) {
//       console.error('Error deleting all tasks:', error);
//     }
//   };

//   const toggleTask = async (id) => {
//     try {
//       const response = await axios.put(`http://localhost:9000/todos/${id}/toggle`);
//       const updatedTask = response.data;
//       setTasks(tasks.map(task => task.id === id ? updatedTask : task));
//     } catch (error) {
//       console.error('Error toggling task:', error);
//     }
//   };

//   console.log(isAuth);
//   console.log(isAuth);
//   console.log(isAuth);
//   console.log(isAuth);
//   console.log(isAuth);
//   console.log(isAuth);
//   console.log(isAuth);

//   return (
//     <div className="App">
//       {isAuth ? (
//         <div>
//           <div className='App-header transition-all duration-[300ms] bg-slate-200 top-0 w-[100%] pt-10 pb-10 z-10 fixed'>
//             <div className='App-header-container flex items-center'>
//               <h1 className='left-10 cursor-pointer relative text-green-400 font-bold text-[30px]' onClick={() => window.location.reload()}>
//                 To-do List
//               </h1>
//               <div className='count flex-1 flex justify-center m-0 p-0 gap-5'>
//                 <p className='text-slate-700 font-bold text-2xl hover:text-sky-300 transition-colors duration-300 ease-in'>Level: {level}</p>
//                 <p className='text-slate-700 font-bold text-2xl hover:text-sky-300 transition-colors duration-300 ease-in'>Points: {points}</p>
//               </div>
//               <div style={{ display: 'flex' }} className="theme-toggle ml-auto mr-[100px] relative -top-3">
//                 <label style={{ display: 'flex', position: 'absolute', width: '44px', height: '24px' }} className="switch" title="Toggle themes">
//                   <input 
//                     style={{ opacity: 0 }} 
//                     type="checkbox" 
//                     ref={checkboxRef}
//                     onChange={toggleTheme}
//                   />
//                   <span style={{ cursor: 'pointer', position: 'absolute', backgroundColor: '#fff', inset: 0, borderRadius: '100px', transition: 'all .3s', border: '2px solid #CBD5E1' }} className="slider"></span>
//                 </label>
//               </div>
//             </div>
//           </div>
//           <TaskList 
//             tasks={tasks}
//             addTask={addTask}
//             deleteTask={deleteTask}
//             deleteAllTasks={deleteAllTasks}
//             toggleTask={toggleTask}
//           />
//         </div>
//       ) : (
//         <Auth setIsAuth={setIsAuth} />
//       )}
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; // Import Axios
import './style/App.css';
import './style/tailwind.css';
import './style/dark-mode.css';
import './style/slider.css';
import TaskList from './TaskList';
import Auth from './auth/auth';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const checkboxRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(0);
  const [isAuth, setIsAuth] = useState(false); // Status autentikasi

  useEffect(() => {
    const loadFromLocalStorage = () => {
      try {
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = storedTheme || (prefersDark ? 'dark-mode' : 'light-mode');
        setIsDarkMode(theme === 'dark-mode');
        document.body.classList.toggle('dark-mode', theme === 'dark-mode');
        document.body.classList.toggle('light-mode', theme === 'light-mode');
      } catch (error) {
        console.error('Error loading theme from localStorage:', error);
      }
    };

    loadFromLocalStorage();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://my-todo-be.vercel.app/todos');
        const tasksFromServer = response.data;
        setTasks(tasksFromServer);

        // Hitung point dan level berdasarkan tasks
        const newPoints = tasksFromServer.filter(task => task.completed).length;
        const newLevel = Math.floor(newPoints / 5);
        setPoints(newPoints);
        setLevel(newLevel);
      } catch (error) {
        console.error('Error fetching tasks from backend:', error);
      }
    };

    fetchTasks();
  }, []);

  const toggleTheme = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    const theme = newIsDarkMode ? 'dark-mode' : 'light-mode';
    document.body.classList.toggle('dark-mode', newIsDarkMode);
    document.body.classList.toggle('light-mode', !newIsDarkMode);
    localStorage.setItem('theme', theme);
  };

  const addTask = async (taskText) => {
    try {
      const response = await axios.post('https://my-todo-be.vercel.app/todos', { text: taskText });
      const newTask = response.data;
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://my-todo-be.vercel.app/todos/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const deleteAllTasks = async () => {
    try {
      for (const task of tasks) {
        await axios.delete(`https://my-todo-be.vercel.app/todos/${task.id}`);
      }
      setTasks([]);
    } catch (error) {
      console.error('Error deleting all tasks:', error);
    }
  };

  const toggleTask = async (id) => {
    try {
      const response = await axios.put(`https://my-todo-be.vercel.app/todos/${id}/toggle`);
      const updatedTask = response.data;
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  console.log(isAuth);

  return (
    <div className="App">
      {isAuth ? (
        <Auth setIsAuth={setIsAuth} />
      ) : (
        <div>
          <div className='App-header transition-all duration-[300ms] bg-slate-200 top-0 w-[100%] pt-10 pb-10 z-10 fixed'>
            <div className='App-header-container flex items-center'>
              <h1 className='left-10 cursor-pointer relative text-green-400 font-bold text-[30px]' onClick={() => window.location.reload()}>
                To-do List
              </h1>
              <div className='count flex-1 flex justify-center m-0 p-0 gap-5'>
                <p className='text-slate-700 font-bold text-2xl hover:text-sky-300 transition-colors duration-300 ease-in'>Level: {level}</p>
                <p className='text-slate-700 font-bold text-2xl hover:text-sky-300 transition-colors duration-300 ease-in'>Points: {points}</p>
              </div>
              <div style={{ display: 'flex' }} className="theme-toggle ml-auto mr-[100px] relative -top-3">
                <label style={{ display: 'flex', position: 'absolute', width: '44px', height: '24px' }} className="switch" title="Toggle themes">
                  <input 
                    style={{ opacity: 0 }} 
                    type="checkbox" 
                    ref={checkboxRef}
                    onChange={toggleTheme}
                  />
                  <span style={{ cursor: 'pointer', position: 'absolute', backgroundColor: '#fff', inset: 0, borderRadius: '100px', transition: 'all .3s', border: '2px solid #CBD5E1' }} className="slider"></span>
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
      )}
    </div>
  );
}

export default App;