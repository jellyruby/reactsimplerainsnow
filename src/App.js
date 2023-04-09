import './App.css';
import React,{useEffect} from 'react';
import {CREATE_CLOUD, SET_SCREEN_SIZE,WeatherContext,useCustomReducer} from './reducer/index';
//import snow component






const App = () => {

  const [state, dispatch] = useCustomReducer();

  const onClick = () => {
    dispatch({type: CREATE_CLOUD});
  }
  
  useEffect(() => {
    const handleResize = () => {
      console.log('resize');
      dispatch({type: SET_SCREEN_SIZE, value: {width: window.innerWidth, height: document.body.scrollHeight}});
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [dispatch]);

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
