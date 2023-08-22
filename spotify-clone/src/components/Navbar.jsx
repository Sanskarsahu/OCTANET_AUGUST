import React from 'react'
import { FaSearch } from "react-icons/fa"
import { CgProfile } from 'react-icons/cg'
import { useEffect } from 'react';
import { useStateProvider } from "../utils/StateProviders";
import { reducerCases } from '../utils/Constant';
import axios from 'axios';
import styled  from 'styled-components';

export default function Navbar({NavBG}) {
  const [{token ,userInfo }, dispatch] = useStateProvider();
  useEffect(()=> {
     const getUserinfo = async ()=>{
       const { data } = await axios.get("https://api.spotify.com/v1/me" , {
         headers: {
           "Authorization" :  "Bearer "+ token,
           "Content-Type" : "application/json",
       },
       });
       const userInfo ={
         userId: data.id,
         userName : data.display_name,
       
     };
     dispatch( {type:reducerCases.SET_USER, userInfo} )
     };
     getUserinfo();
  },[dispatch,token])  
  return (
    <Nav NavBG={NavBG}>
      <div className='search-bar'>
        <FaSearch/>
        <input type='text' placeholder='Artist ,song, or boadcast'/>
      </div>
      <div className='avtar'>
       <a href='./'>
        <CgProfile/>
        <span> { userInfo?.userName }</span>
        </a>
      </div>
    </Nav>
  )
}
const Nav = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding:2rem;
height: 1vh;
position:sticky;
top: 0;
transition:0.3s ease-in-out;
background-color: ${({ NavBG }) => NavBG ? "rgba(0,0,0,0.7)": "none"};
.search-bar{
    background-color: white;
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    flex-direction:row;
    align-items: center;
    gap:0.5rem;
    input{
      border: none;
      outline: none;
      width: 100%;
    }
}
.avtar{
    background-color: white;
    padding: 0.4rem;
    border-radius: 2rem;
    display: flex;
    flex-direction:row;
    align-items: center;
    a{
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        color: black;
        font-weight: bold;
        svg{
            font-size: 1.3rem;
            background-color: #282828;
            padding: 0.2rem;
            border-radius: 1rem;
            color:#c7c5c5;
        }
        }
}

`