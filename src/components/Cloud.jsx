/// Cloud에서 Rain과 Snow가 내리는 것을 표현하는 컴포넌트

import React, { memo, useEffect, useRef } from "react";
import styles from "../css/Cloud.module.css";

const Cloud = memo(() => {
  const animationRef = useRef(null);
  const CloudRef = useRef(null);
  const [onClickState, setOnClickState] = useState(false);

  useEffect(() => {

    const render = () => {
      
      if(onClickState === false) {
        CloudRef.current.style.left = (CloudRef.current.getBoundingClientRect().left + (Math.random()-0.5)*2)+'px'; // Cloud가 좌우로 움직이는 것을 표현
      }
      animationRef.current = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animationRef.current);
    }

  }, []);

  return (
    <div className={styles.Cloud} ref={CloudRef} ></div>
  );

});