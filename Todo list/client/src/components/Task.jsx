import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import axios from "axios";
import { TbArchive } from "react-icons/tb";
export default function Task() {

  const [TasksList, setTaskList] = useState([]);
  
  useEffect(() => {
    fetchTasks();
  }, []);
  async function fetchTasks() {
    const response = await fetch('http://localhost:3001/tasks');
    const tasksData = await response.json();
    setTaskList(tasksData);
  }

  async function deleteTask(taskId) {
    await axios.delete(`http://localhost:3001/tasks/` + taskId);
    fetchTasks();
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
 

  const toggleCheckbox = async (taskId, isCompleted) => {
    await axios.put(`http://localhost:3001/tasks/${taskId}`, { isCompleted });
    fetchTasks();
  };
  
  const sortTasks = (a, b) => {
    
    if (a.priority === b.priority) {
        
        return new Date(a.due_date) - new Date(b.due_date);
    } else {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
};
   
  return (
    <>
      {
        TasksList.sort(sortTasks).map((task) => {
          return (
            <Todo key={task._id}    >
              <div className='chek'> <input type="checkbox" name="checkbox" checked={task.isCompleted} onChange={() => toggleCheckbox(task._id, !task.isCompleted)} /></div>
              <div className="lable"><span>{task.label}</span></div>
              <div className="duration"><span>{formatDate(task.due_date)}</span></div>
              <div className="piroties ">{task.priority}</div><div className="done">
                <button onClick={() => { deleteTask(task._id) }}><TbArchive /></button>
              </div>
            </Todo>)
        })
      }
    </>
  )
}
const Todo = styled.div`
  height: 3rem;
  width:98% ;
  display: grid;
  position:relative;
  inset: 2% 1%;
  gap:0.5rem;
  margin-bottom: 1%;
  background-color: white;
  grid-template-columns: 3vw 30vw 5vw 5vw 5vw;
  justify-content: space-between;
  align-content:center;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
  button{
    border: none;
    background: transparent;
    font-size: 1.5rem;
  }
  .chek{
    width: 2.5rem;
    height: 1.5rem;
    text-align: center;
    input{
      transition-delay:0.5s;
      transition-timing-function: ease;
    }
  }

`