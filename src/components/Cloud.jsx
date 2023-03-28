/// Cloud에서 Rain과 Snow가 내리는 것을 표현하는 컴포넌트

import React, { memo, useEffect, useRef,useState } from "react";
import Snow from "./Snow";
import styles from "../css/Cloud.module.css";

const getRectCenter = (rect) => {

  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  }
}

const Cloud = memo(() => {

  
  const CloudRef = useRef(null);
  const [isPrecipitation, setIsPrecipitation] = useState(false);
  const [PrecipitationList, setPrecipitationList] = useState([]);
  const EffectRef = useRef(null);
  const [screenSize, setScreenSize] = useState({width: 0, height: 0});

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

  useEffect(()=>{

    EffectRef.current = setTimeout(()=>{
      setPrecipitationList(
        (prevValue)=>{
          const {x,y} = getRectCenter(CloudRef.current.getBoundingClientRect());
            
          return [...prevValue, <Snow key={prevValue.length} left={x} top={y} />];
        }
      );
    },1000);

    return(
      (prevValue)=>{
        clearTimeout(EffectRef.current);
      if(prevValue) {
        setPrecipitationList([]);
      }
    })

  },[PrecipitationList])

  useEffect(()=>{
    const {innerWidth, innerHeight} = window;
    setScreenSize({width: innerWidth, height: innerHeight});
  },[]);

  return (
    <div 
      className={styles.CloudForm}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove} 
      onMouseUp={onMouseUp}
      onMouseOut={onMouseOut}
      onDoubleClick={onDoubleClick}
      >
      {PrecipitationList}
      <div className={CloudStyle()} ref={CloudRef}>
        
      </div>
    </div>
  );

});

export default Cloud;
