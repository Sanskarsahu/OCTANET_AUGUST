import { reducerCases } from "./Constant";

export const initialState = {
    token: null,
    playlists: [],
    userInfo: null,
    selectedPlaylistId:"08hF4lYhhENxfBJY5QLOvk",
    selectedPlaylist: null,
    currentlyPlaying: null,
    playerState:false,
    seeker:0,
};

const reducer = (state, action) => {
    switch (action.type) {
     case reducerCases.SET_TOKEN: {
        return{
            ...state,
            token: action.token,
        }
     }
     case reducerCases.SET_PLAYLISTS: {
        return {
            ...state,
            playlists :action.playlists,
        };
     }
     case reducerCases.SET_USER: {
        return {
            ...state,
            userInfo :action.userInfo,
        };
     }
     case reducerCases.SET_PLAYLIST: {
        return{
            ...state,
            selectedPlaylist :action.selectedPlaylist,
        }
     }
     case reducerCases.SET_PLAYING:{
        return{
            ...state,
            currentlyPlaying :action.currentlyPlaying,
        }
     }
     case reducerCases.SET_PLAYER_STATE:{
        return{
            ...state,
            playerState :action.playerState,
        }
     }
     case reducerCases.SET_PLAYLIST_ID:{
        return{
            ...state,
            selectedPlaylistId :action.selectedPlaylistId,
        }
     }
     case reducerCases.SET_SEEKER_POSTION:{
        return{
            ...state,
            seeker :action.seeker,
        }
     }

     default:
         return state;
    }
    };

 export default reducer;