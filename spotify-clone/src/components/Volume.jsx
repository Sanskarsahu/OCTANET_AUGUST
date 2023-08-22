import React from 'react'
import { styled } from 'styled-components'
import { useStateProvider } from '../utils/StateProviders';
import axios from 'axios';
export default function Volume() {
    const [{ token }] = useStateProvider();
    const setVolume= async(e) => {
        await axios.put(
            'https://api.spotify.com/v1/me/player/volume', {},
            { 
                params:{
                    volume_percent:parseInt(e.target.value),
                },

                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }
        );
    };
  return (
    <Vol>
        <input type="range" min={0} max={100} onMouseMove={(e=>setVolume(e))} />
    </Vol>
  )
}
const Vol = styled.div`
display: flex;
justify-content: flex-end;
align-content: center;
input{
    width:10rem;
    border-radius: 2rem;
    height:0.2rem;
    /* color: white; */
}
`