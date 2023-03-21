import React,{memo, useEffect, useRef} from "react";
import styles from "../css/Snow.module.css";


const Snow = memo(() => {

  const animationRef = useRef(null);
  const snowRef = useRef(null);

  useEffect(() => {

    const render = () => {
      
      snowRef.current.style.top = (snowRef.current.getBoundingClientRect().top + Math.random()*1)+'px';
      snowRef.current.style.left = (snowRef.current.getBoundingClientRect().left + (Math.random()-0.5)*2)+'px';
      animationRef.current = requestAnimationFrame(render);
    }

    render();


    return () => {
      cancelAnimationFrame(animationRef.current);
    }

  }, []);


  return (
    <div className={styles.snow} ref={snowRef} ></div>
  );

});

export default Snow;