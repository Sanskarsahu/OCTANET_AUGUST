import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Sidebar from "./Sidebar"
import Playlistcontent from "./Playlistcontent"
import Navbar from './Navbar'
import Footer from './Footer';
export default function Spotify() {
const bodyRef= useRef();
const [ navBG, setnavBG ]= useState(false);
const [ headerBG, setheaderBG ]= useState(false);
const bodyScroll =()=>{
  bodyRef.current.scrollTop >= 30
  ?setnavBG(true)
  :setnavBG(false);
  bodyRef.current.scrollTop >= 268
  ?setheaderBG(true)
  :setheaderBG(false);

}
  return (
    <Container>
       <div className='spotify-body'>
        <Sidebar/>
        <div className='body' ref={bodyRef} onScroll={bodyScroll}>
         <Navbar NavBG={ navBG }/>
          <div className='body-con'>
            <Playlistcontent HeaderBG={ headerBG }/>
          </div>
        </div>
      </div>
      <div className='footer'>
            <Footer/>
       </div>
       
    </Container>
  )
}
const Container = styled.div`
background-color: #f63737;
max-width: 100vw;
max-height: 100vh;
overflow: hidden;
display: grid;
grid-template-rows: 90vh 10vh;
 .spotify-body{
  display: grid;
  grid-template-columns: 15vw 85vw;
  height: 100%;
  width:100%;
  
  .body{
    
    height: 100%;
    width :100%;
    overflow: auto;
    background:linear-gradient(transparent, rgba(0,0,0,2));
      &::-webkit-scrollbar {
        width: 0.7rem;
      &-thumb{
        background-color: rgba(255,255,255,0.6);
        border-radius: 2px;
        }
  }
  
 }
}
  
`