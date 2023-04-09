

import Cloud from '../components/Cloud';
import React,{useReducer,createContext} from 'react';


export const WeatherContext = createContext(
  {
    screenSize: {
      width: window.innerWidth,
      height: document.body.scrollHeight 
    },
    cloud:{
      List : [<Cloud/>]
    },
    dispatch : () => {}
  }
);

const initialState = {
  screenSize: {
    width: window.innerWidth ,
    height: document.body.scrollHeight 
  },
  cloud:{
    List : [<Cloud/>]
  }  
}


export const SET_SCREEN_SIZE = 'SET_SCREEN_SIZE';
export const CREATE_CLOUD = 'CREATE_CLOUD';

//reducer function to update the state
const reducer = (state, action) => {

  switch(action.type){
    case SET_SCREEN_SIZE:
      return {
        ...state,
        screenSize: action.value
      }
    case CREATE_CLOUD:
      console.log(state);
      return {
        ...state,
        cloud: {List:[...state.cloud.List, <Cloud key={state.cloud.List.length}/>]}
      }
    default:
      return state;
  }

}

export const useCustomReducer = () => {
  return  useReducer(reducer, initialState);
}

export default useCustomReducer;