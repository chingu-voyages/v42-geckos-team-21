import { useState, useRef } from 'react';
import "./Alert.css"
import "animate.css"
import { CSSTransition } from "react-transition-group"


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

  let [isIn, setIsIn] = useState(false);
  let [previousAlertKey, setPreviousAlertKey] = useState(0);
  console.log('idek');
  console.log(previousAlertKey, props.alertKey);
  if (props.text === '') {
    // do not render if props.text === ''
    return null;
  } else if (previousAlertKey !== props.alertKey) {

    setIsIn(true);
    setPreviousAlertKey(oldPreviousAlertKey => {
      
      oldPreviousAlertKey++
      return oldPreviousAlertKey;
    });
  }


  if (isIn) {
    setTimeout(() => setIsIn(false), props.exitAfterDuration);
  }
  console.log({isIn});

  return (
    <CSSTransition nodeRef={nodeRef} in={isIn} appear={true} timeout={1000} classNames={classNames}>
      <div ref={nodeRef} id="alert" className="animate__animated" >
        {props.text}
      </div>
    </CSSTransition>
  )
}

export default Alert