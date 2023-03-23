import React,{memo, useEffect, useRef} from "react";
import styles from "../css/Rain.module.css";


const Rain = memo(() => {

  const animationRef = useRef(null);
  const RainRef = useRef(null);

  useEffect(() => {

    const render = () => {
      
      RainRef.current.style.top = (RainRef.current.getBoundingClientRect().top + Math.random()*1)+'px';
      RainRef.current.style.left = (RainRef.current.getBoundingClientRect().left + (Math.random()-0.5)*2)+'px';
      animationRef.current = requestAnimationFrame(render);
    }

    render();


    return () => {
      cancelAnimationFrame(animationRef.current);
    }

  }, []);


  return (
    <div className={styles.Rain} ref={RainRef} ></div>
  );

});

export default Rain;