import React from 'react'
import styled  from 'styled-components'

export default function Login() {
  const handleclick =() => {
    const clientId="31b8e3ac9823449ba9c6ecf55f0d7488"
    const redirectUrl="http://localhost:3000/";
    const apiUrl="https://accounts.spotify.com/authorize";
    const scope=[
      "user-read-email",
      "user-read-private",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "user-read-playback-position",
      "user-top-read",
      "user-read-recently-played",
    ];
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_daialog=true`;
  }
  return (
    
    <Container className='banner'>
      <img src={'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White-768x230.png'} alt="spotify"></img>
      <button onClick={handleclick}>Login</button>
    </Container>
  )
}
const Container= styled.div `
background-color : black;
display: flex;
justify-content:center;
flex-direction: column;
align-items: center;
width: 100vw;
height: 100vh;
gap:5rem;
img{
  height:20vh;
}
button{
  border:none;
  background-color: #6ded6d;
  width:250px;
  height:125px;
  color:white;
  font-size:3rem;
  border-radius:200px;
  
}
`;