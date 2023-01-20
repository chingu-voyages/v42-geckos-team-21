import { useState, useRef } from 'react';
import "./Alert.css"
import "animate.css"
import { CSSTransition } from "react-transition-group"


console.log(typeof CSSTransition);

interface IfcProps {
  text: string
  exitAfterDuration: number
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
  let [previousText, setPreviousText] = useState('');
  
  if (props.text === '') {
    // do not render if props.text === ''
    return null;
  } else if (props.text !== previousText) {
    setIsIn(true);
    setPreviousText(props.text);
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