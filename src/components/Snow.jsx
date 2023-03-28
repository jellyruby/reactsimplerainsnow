import React,{memo, useEffect, useRef} from "react";
import styles from "../css/Snow.module.css";


const Snow = memo(({left,top}) => {

  const animationRef = useRef(null);
  const snowRef = useRef(null);
  const initialRef = useRef(true);

  useEffect(() => {

    const render = () => {

      if(initialRef.current) {
        snowRef.current.style.top = top+'px';
        snowRef.current.style.left = left+'px';
        initialRef.current = false;
        return;
      }

      
      snowRef.current.style.top = (snowRef.current.getBoundingClientRect().top + Math.random()*1)+'px';
      snowRef.current.style.left = (snowRef.current.getBoundingClientRect().left + (Math.random()-0.5)*2)+'px';
      animationRef.current = requestAnimationFrame(render);
    }

    render();


    return () => {
      cancelAnimationFrame(animationRef.current);
    }

  }, [left,top]);


  return (
    <div className={styles.snow} ref={snowRef} ></div>
  );

});

export default Snow;