import { createContext,useContext,useReducer } from "react";

export const StateContext =createContext();

export const StateProvider =({children,initialsState,reducer})=>(
    <StateContext.Provider value={useReducer(reducer,initialsState )}>
        {children}
    </StateContext.Provider>
);
export const useStateProvider = () => useContext(StateContext);