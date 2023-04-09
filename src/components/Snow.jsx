import React,{memo, useEffect, useRef,useContext} from "react";
import styles from "../css/Snow.module.css";
import {WeatherContext} from "../reducer/index";


const Snow = memo(({left,top,deleteFunc,index}) => {

  const animationRef = useRef(null);
  const snowRef = useRef(null);
  const initialRef = useRef(true);
  //useContext

  const {screenSize} = useContext(WeatherContext);


  useEffect(() => {

    const render = () => {

      if(initialRef.current) {
        
        snowRef.current.style.top = top+'px';
        snowRef.current.style.left = left+'px';
        initialRef.current = false;
        return;
      }

      const {width, height} = screenSize;
      const ChagnedTop = snowRef.current.getBoundingClientRect().top + Math.random()*5;
      const ChangedLeft = snowRef.current.getBoundingClientRect().left + (Math.random()-0.5)*2;


      
      if(ChagnedTop > height) {
        
        deleteFunc(index);
        return;
      }

      if(ChangedLeft > width) {
        
        deleteFunc(index);
        return;
      }

      snowRef.current.style.top = ChagnedTop+'px';
      snowRef.current.style.left = ChangedLeft+'px';
      animationRef.current = requestAnimationFrame(render);
    }

    render();


    return () => {
      cancelAnimationFrame(animationRef.current);
    }

  }, [deleteFunc, index, left, screenSize, top]);


  return (
    <div className={styles.snow} ref={snowRef} ></div>
  );

});

export default Snow;