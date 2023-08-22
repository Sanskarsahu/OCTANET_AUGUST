import React from 'react';
import styled  from 'styled-components';
import {IoLibrary} from "react-icons/io5"
import {MdHomeFilled ,MdSearch} from "react-icons/md"
import Playlist from './Playlist';
export default function Sidebar() {
  return (
    <Sideba>
        <div className='top'>
          <ul>
            <li> <MdHomeFilled/> Home</li>
            <li> <MdSearch/> Search</li>
            <li><IoLibrary/> Your Library</li>
          </ul>
        </div>
        <div className='playlist'>
        
        <Playlist/>
        
        </div>
    </Sideba>
  )
}
const Sideba = styled.div`
 background-color: black;
 
 color: #b3b3b3;
 display:flex;
 flex-direction: column;
 height: 100vh;
 
 .top{
  position: relative;
  background-color:#4C4C4C;
  margin: 5px;
  border-radius: 5px;
  padding-top:15px;
  top: 50px;
 }
 ul{
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  li{
    display: flex;
    gap: 1rem;
    cursor: pointer;
    transition:0.3s ease-in-out;
    &:hover{
      color: white;
    }
  }
 }
 .playlist{
  position: relative;
  top: 100px;
 
 }
`