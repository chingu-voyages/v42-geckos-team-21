import { useState, useRef } from 'react';
import "./Alert.css"
import "animate.css"
import { CSSTransition } from "react-transition-group"
import { time } from 'console';


console.log(typeof CSSTransition);

interface IfcProps {
  text: React.ReactNode,
  exitAfterDuration: number,
  setAlertKey: React.Dispatch<React.SetStateAction<number>>,
  alertKey: number
}

const classNames = {
  appear: 'animate__bounce',
  appearActive: 'animate__bounce',
  appearDone: 'animate__bounce',
  enter: 'animate__bounce',
  enterActive: 'animate__bounce',
  enterDone: 'animate__bounce',
  exit: 'animate__bounce',
  exitActive: 'animate__fadeOut',
  exitDone: 'animate__fadeOut'
}

function Alert(props: IfcProps) {

  const nodeRef = useRef(null);
  const timeoutIdRef = useRef<number | null>(null);

  let [isIn, setIsIn] = useState(false);
  let [previousAlertKey, setPreviousAlertKey] = useState(0);

  console.log({props});
  console.log('state', {isIn, previousAlertKey, timeoutIdRef});

  console.log('prev, current:', previousAlertKey, props.alertKey);
  if (props.text === '') {
    // do not render if props.text === ''
    return null;
  } else if (previousAlertKey !== props.alertKey) {

    setIsIn(true);
    setPreviousAlertKey(oldPreviousAlertKey => {
      
      oldPreviousAlertKey++
      return oldPreviousAlertKey;
    });


    if (timeoutIdRef.current) {
      console.log(timeoutIdRef.current, 'timeout cleared');
      clearTimeout(timeoutIdRef.current);
    }

    let localTimeoutId = window.setTimeout(() => setIsIn(false), props.exitAfterDuration);
   
    console.log({localTimeoutId}, previousAlertKey, props.alertKey);
    timeoutIdRef.current = localTimeoutId;
  }
  
      


  

  return (
    <CSSTransition nodeRef={nodeRef} in={isIn} appear={true} timeout={1000} classNames={classNames}>
      <div ref={nodeRef} id="alert" className="animate__animated" >
        {props.text}
      </div>
    </CSSTransition>
  )
}

export default Alert