import './App.css';
import React,{createContext,useReducer} from 'react';
import Cloud from './components/Cloud';
//import snow component

export const WeatherContext = createContext(
  {
    screenSize: {
      width: 0,
      height: 0
    },
    dispatch : () => {}
  }
);

const initialState = {
  screenSize: {
    width: 0,
    height: 0
  }  
}

export const SET_SCREEN_SIZE = 'SET_SCREEN_SIZE';

//reducer function to update the state
const reducer = (state, action) => {

  switch(action.type){
    case SET_SCREEN_SIZE:
      return {
        ...state,
        screenSize: action.value
      }
    default:
      return state;
  }

}

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState );

  return (
    <WeatherContext.Provider value={{screenSize: state.screenSize, dispatch}}>
      <div className="App">
        
        <Cloud/>
        
      </div>
    </WeatherContext.Provider>
  );
}

export default App;
