import { useState, useRef, useEffect } from 'react';
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
  useEffect(() => {
    let timeoutId = window.setTimeout(() => setIsIn(false), props.exitAfterDuration);

    return function cleanup() {
      window.clearTimeout(timeoutId);
    }

  }, [props.alertKey]);



  const nodeRef = useRef(null);
  const timeoutIdRef = useRef<number | null>(null);

  let [isIn, setIsIn] = useState(false);
  let [previousAlertKey, setPreviousAlertKey] = useState(0);

  console.log({ props });
  console.log('state', { isIn, previousAlertKey, timeoutIdRef });

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
  }






  return (
    <CSSTransition nodeRef={nodeRef} in={isIn} appear={true} timeout={1000} classNames={classNames}>
      {/* Using key here to trigger rebounce on alertKey change */}
      <div ref={nodeRef} id="alert" className="animate__animated animate__bounce" key={props.alertKey}>
        {props.text}
      </div>
    </CSSTransition>
  )
}

export default Alert