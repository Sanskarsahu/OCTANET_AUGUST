import React ,{ useEffect } from 'react'
import { styled } from 'styled-components'
import { useStateProvider } from '../utils/StateProviders'
import { reducerCases } from '../utils/Constant';
import axios from 'axios'
export default function Currenttrack() {
    const [{token , currentlyPlaying  }, dispatch] = useStateProvider();
  useEffect(()=>{
    const getCurrenttrack = async () => {
        const response = await axios.get( 
            "https://api.spotify.com/v1/me/player/currently-playing",
        {
            headers: {
                "Authorization" :  "Bearer "+ token,
                "Content-Type" : "application/json",
            },
        }
        ); 
        if (response.data !==""){
              const { item } =response.data;
              const currentlyPlaying = {
                id: item.id,
                name: item.name,
                artists: item.artists.map((artist)=> artist.name),
                image: item.album.images[2].url,
              }
              
              dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
        }
        
        
    };
    getCurrenttrack();
  },[token,dispatch]);
  return (
    <Current>
        {
            currentlyPlaying && (
                <div className="track">
                    <div className="track-img">
                        <img src={currentlyPlaying.image} alt="current img" />
                    </div>
                    <div className="track-info">
                        <h4>{currentlyPlaying.name}</h4>
                        <h6>{currentlyPlaying.artists}</h6>
                    </div>
                </div>
            )
        }
    </Current>
  )
}
const Current = styled.div`
.track{
display:flex ;

align-items: center;
gap: 1rem;
.track-img{
    height: 100%;
    img{
        height: 40px;

    }
}
.track-info{
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    h4{
        color:white;
        font-size: 0.7rem;
        margin: 0;
    }
    h6{
        color: #b3b3b3;
        font-size: 0.5rem;
        margin: 0;
    }
}
}
`