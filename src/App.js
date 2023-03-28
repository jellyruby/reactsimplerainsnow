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
    cloud:{
      List : [<Cloud/>]
    },
    dispatch : () => {}
  }
);

const initialState = {
  screenSize: {
    width: 0,
    height: 0
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

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState );

  const onClick = () => {
    dispatch({type: CREATE_CLOUD});
  }

  return (
    <WeatherContext.Provider value={{screenSize: state.screenSize, dispatch}}>
      <div className="App">
        <button onClick={onClick}>구름 생성</button>
        {state.cloud.List}
        
        
      </div>
    </WeatherContext.Provider>
  );
}

export default App;
