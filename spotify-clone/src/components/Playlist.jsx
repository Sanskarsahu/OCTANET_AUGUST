import React from 'react';
import { useEffect } from 'react';
import { useStateProvider } from "../utils/StateProviders";
import { reducerCases } from '../utils/Constant';
import styled from 'styled-components';
import axios from 'axios';

export default function Playlist() {
  const [{ token, playlists }, dispatch] = useStateProvider();
  useEffect(() => {
    const getPlayListData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;
      
      const playlists = items.map(({ name,id, }) => {

        return ({ name, id, });
      });
      
      dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });

    };
    getPlayListData();
  }, [token, dispatch]);
  const chnageCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });

  }
  return (
    <Playl>
      <div>
        <ul>
          {playlists.map(({ name, id  }) => {
            return (
              <li key={id} onClick={() => chnageCurrentPlaylist(id)}> {name}</li>)
          })}

        </ul>
      </div>
    </Playl>
  )
}

const Playl = styled.div`
background-color:#4C4C4C;
margin: 5px;
border-radius: 5px;
overflow: hidden;
height: 100%;
  ul{
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  height: 52vh;
  max-height:100%;
  overflow: auto;
  
  &::-webkit-scrollbar {
  width: 0.7rem;
  &-thumb{
    background-color: rgba(255,255,255,0.6);
  }
}
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
`