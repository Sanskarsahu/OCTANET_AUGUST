import React, { useEffect } from 'react'
import { AiFillClockCircle } from 'react-icons/ai'
import { useStateProvider } from '../utils/StateProviders'
import { reducerCases } from '../utils/Constant';
import styled from 'styled-components';
import axios from 'axios';
export default function Playlistcontent({ HeaderBG }) {
  const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] = useStateProvider();

  useEffect(() => {
    const getInitialPlaylist = async () => {

      const response = await axios.get(
        "https://api.spotify.com/v1/playlists/" + selectedPlaylistId,
        {
          headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response)
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          album: track.album.name,
          image: track.album.images[2].url,
          duration: track.duration_ms,
          context_uri: track.album.uri,
          track_number: track.track_number,

        })),
      };

      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist })
    };
    getInitialPlaylist();

  }, [token, dispatch, selectedPlaylistId]);
  const msToMinutesandseconds = (ms) => {
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000).toFixed(0);
    return min + ":" + (sec < 10 ? "0" : "") + sec
  }
  const playTrack = async (id, name, artists, image, context_uri, track_number) => {
   const res= await axios.put(
      "https://api.spotify.com/v1/me/player/play", {
      context_uri,
      offset: {
        position: track_number - 1
      },
      position_ms: 0,
    },
      {
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
   if (res.status===200){
    const currentlyPlaying ={
      id,image,name,artists,
    };
    dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying })
    dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState:true })
   }
   else
   dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState:true })
  }
  return (
    <Play HeaderBG={HeaderBG}>
      {selectedPlaylist && (
        <>
          <div className='playlist'>
            <div className='image'>
              <img src={selectedPlaylist.image} alt='selected playlist' />
            </div>
            <div className='details'>
              <span className='type'></span>
              <h1 className='tittel'>{selectedPlaylist.name}</h1>
              <p className='description'>{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className='list'>
            <div className='hader-row'>
              <div className='col'>
                <span>#</span>
              </div>
              <div className='col'>
                <span>Title</span>
              </div>
              <div className='col'>
                <span>Album</span>
              </div>
              <div className='col'>
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className='tracks'>

              {
                selectedPlaylist.tracks.map(({
                  id,
                  name,
                  artists,
                  image,
                  duration,
                  album,
                  track_number,
                  context_uri,
                }, index) => {
                  return (
                    <div className='row' key={id} onClick={() => playTrack(id, name, artists, image, context_uri, track_number)}>
                      <div className='col'>
                        <span>{index + 1}</span>


                      </div>
                      <div className='col detail'>
                        <div className='image'>
                          <img src={image} alt='track' />
                        </div>

                        <div className='info'>
                          <span className='name'>{name}</span>
                          <span className='artist'>
                            {artists}
                          </span>
                        </div>
                      </div>
                      <div className='col'>
                        {album}
                      </div>
                      <div className='col'>
                        {msToMinutesandseconds(duration)}
                      </div>
                    </div>

                  );
                }
                )
              }
            </div>
          </div>
        </>
      )}
    </Play>
  )
}
const Play = styled.div`
   .playlist{
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    .image{
      img{
        height: 15rem;
        box-shadow: rgba(0,0,0,0,0.25) 0px 25px 50px -12px;
      }
    }
    .details{
      display: flex;
      flex-direction: column;
      gap:1rem;
      color: #e0dede;
      .title{
        color: white;
        font-size: 4rem;

      }
    }
   }
   .list{
     background-color:#000000dc ;
    .hader-row{
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      color: #dddcdc;
      margin: 1rem 0 0 0;
      position: sticky;
      top: 6vh;
      padding: 1rem 1rem;
      transition: 0.3s ease-in-out;
      background-color: ${({ HeaderBG }) => HeaderBG ? "#000000dc" : "none"};
    }
    .tracks{
      margin: 0.2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row{
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3fr 1.8fr 0.1fr;
        &:hover{
          background-color: rgba(0,0,0,0.7);
        }
        .col{
          display: flex;
          align-items: center;
          color: #dddcdc;
          gap: 5rem;
          img{
            height: 40px;
          }
        }
        .detail{
          display: flex;
          gap:1rem;
          .info{
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
   }
`