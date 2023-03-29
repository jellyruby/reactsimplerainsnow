/// Cloud에서 Rain과 Snow가 내리는 것을 표현하는 컴포넌트

import React, { memo, useEffect, useMemo, useCallback,useRef,useState } from "react";
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
  const [DeletePrecipitationList, setDeletePrecipitationList] = useState([]);
  
  const EffectRef = useRef(null);
  const IndexRef = useRef(0);
  

  //AddDragAndDrop
  const [onClickState, setOnClickState] = useState(false);

  const onMouseDown = useCallback(() => {
    setOnClickState(true);
  },[]);
  
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

  const onMouseUp = useCallback( () => setOnClickState(false),[])

  const onMouseOut = useCallback( (e) => setOnClickState(false),[])

  const onDoubleClick = useCallback( () => setIsPrecipitation((prevValue)=>!prevValue),[])

  const CloudStyle = () => {

    if(isPrecipitation) return (styles.Cloud + " " + styles.PrecipitationCloud);

    return styles.Cloud;
  }

  const deleteFunc = ((key)=>{

    
    setDeletePrecipitationList( prevValue => { 
      
      return [...prevValue,key]
    });
    
  });


  useEffect(()=>{

    EffectRef.current = setTimeout(()=>{
      IndexRef.current++;
      setPrecipitationList(
        (prevValue)=>{
          const {x,y} = getRectCenter(CloudRef.current.getBoundingClientRect());
          
          

          if(prevValue.length > 0 && DeletePrecipitationList.length > 0){
          
              

            prevValue = prevValue.filter(
              (item)=>{
                
                return !DeletePrecipitationList.includes(item.key)
              }
            );
            //setDeletePrecipitationList([]);
          }

          console.log(prevValue);
          
          return [...prevValue,{
              key:IndexRef.current,
              tag:<Snow 
                    key={IndexRef.current} 
                    left={x} 
                    top={y}  
                    index={IndexRef.current}
                    deleteFunc={deleteFunc}
                  />
              }];
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

  

  return (
    <div 
      className={styles.CloudForm}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove} 
      onMouseUp={onMouseUp}
      onMouseOut={onMouseOut}
      onDoubleClick={onDoubleClick}
      >
      {
      PrecipitationList.map((item)=>item.tag)
      }
      <div className={CloudStyle()} ref={CloudRef}>
        
      </div>
    </div>
  );

});

export default Cloud;
