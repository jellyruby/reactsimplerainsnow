/// Cloud에서 Rain과 Snow가 내리는 것을 표현하는 컴포넌트

import React, { memo, useEffect, useRef,useState } from "react";
import Snow from "./Snow";
import styles from "../css/Cloud.module.css";

const Cloud = memo(() => {

  
  const CloudRef = useRef(null);
  const [isPrecipitation, setIsPrecipitation] = useState(false);

  //AddDragAndDrop
  const [onClickState, setOnClickState] = useState(false);

  const onMouseDown = () => {
    setOnClickState(true);
  }

  const onMouseMove = (e) => {
    
    if(onClickState) {
      const cloudPosition = {x: 0, y: 0};
      const {width, height} = CloudRef.current.getBoundingClientRect();
      
      cloudPosition.x = e.clientX - (width/2);
      cloudPosition.y = e.clientY - (height/2);

      CloudRef.current.style.left = `${cloudPosition.x}px`;
      CloudRef.current.style.top = `${cloudPosition.y}px`;
    }
  }

  const onMouseUp = () => {
    setOnClickState(false);
  }

  const onMouseOut = (e) => {

    setOnClickState(false);
  
  }

  const onDoubleClick = () => {

    setIsPrecipitation((prevValue)=>!prevValue);

  }

  const CloudStyle = () => {

    if(isPrecipitation) return (styles.Cloud + " " + styles.PrecipitationCloud);

    return styles.Cloud;
  }

  return (
    <div 
      className={styles.CloudForm}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove} 
      onMouseUp={onMouseUp}
      onMouseOut={onMouseOut}
      onDoubleClick={onDoubleClick}
      >
      <Snow/>
      <div className={CloudStyle()} ref={CloudRef}>
        
      </div>
    </div>
  );

});

export default Cloud;
