/// Cloud에서 Rain과 Snow가 내리는 것을 표현하는 컴포넌트

import React, { memo, useEffect, useRef,useState } from "react";
import styles from "../css/Cloud.module.css";

const Cloud = memo(() => {
  const animationRef = useRef(null);
  const CloudRef = useRef(null);
  

  //AddDragAndDrop
  
  const [onClickState, setOnClickState] = useState(false);
  const [dragStart, setDragStart] = useState({x: 0, y: 0});
  const [dragEnd, setDragEnd] = useState({x: 0, y: 0});


  const onMouseDown = () => {
    setOnClickState(true);
  }

  const onDrag = (e) => {
    if(onClickState) {
      setDragStart({x: e.clientX, y: e.clientY});
    }
  }

  const onMouseUp = (e) => {
    setOnClickState(false);
    setDragEnd({x: e.clientX, y: e.clientY});
  }

  useEffect(() => {

    
    const render = () => {
      animationRef.current = requestAnimationFrame(render);
      //AddDragAndDrop
      if(onClickState) {
        CloudRef.current.style.left = `${dragEnd.x - dragStart.x}px`;
        CloudRef.current.style.top = `${dragEnd.y - dragStart.y}px`;
      }

    }

    render();

    return () => {
      cancelAnimationFrame(animationRef.current);
    }

  }, []);

  return (
    <div className={styles.Cloud} ref={CloudRef}  onMouseDown={onMouseDown} onDrag={onDrag} onMouseUp={onMouseUp}>
      <div className={styles.Cloud}></div>
    </div>
  );

});

export default Cloud;
