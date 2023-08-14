import React, { useState} from 'react'
import { styled } from 'styled-components'
import Task from './Task'
import Addtask from './Addtask';


export default function Tasks() {
  const [Newtask,setNewtask]= useState(false);
  
  return (
    <>
    <List>
      <div className='head'>
        <span>Status</span>
        <span>Name</span>
        <span>Due date</span>
        <span>Priority</span>
        <span className='last'>Delete</span>
      </div>
      <div className="task">
        <Task  />
      </div>
      <div className="add">
        <button className="btn" onClick={()=> setNewtask(true)} >+</button>
      </div>
    </List>
    <Addtask trigger={Newtask} setTrigger={setNewtask} >
        
    </Addtask>
    </>
  )
}
const List = styled.div`
    height: 55%;
    width: 55%;
    background: rgba(255, 255, 255, 0.5);
    overflow: hidden;
    position: absolute;
    inset: 30% 25%;
    border-radius: 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    .head{
      position:sticky;
      background-color: white;
      display: grid;
      grid-template-columns: 3vw 30vw 5vw 5vw 5vw;
      justify-content: space-between;
      align-content:center;
      border-bottom: 1px solid black;
      height: 2rem;
      cursor: no-drop;
      span{
        border-right: 1px solid black;
        text-align:center;
        
        font-size: 1rem;

      }
      .last{
        border: none;
      }
    }
    .task{
      overflow:scroll;
      overflow-x:hidden;
      position: relative;
      height: 92%;
      width:100%;
    }
    .task::-webkit-scrollbar {
       display: none;
     }
    .add{
      position: absolute;
      right: 5vw;
      bottom: 5vw;
      cursor: pointer;
    }
    .btn{
      height: 50px;
      width: 50px;
      border-radius: 100%;
      text-align: center;
      background-color: white;
      position:absolute;
      border: none;
      font-size: 2.5rem;
      
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    }
`