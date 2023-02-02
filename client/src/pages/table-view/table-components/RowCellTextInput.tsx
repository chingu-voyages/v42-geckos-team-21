import { useState, useEffect } from 'react';
import { IfcCellInputErrors } from './Row';
interface IfcCellTextObj {
    [key: string]: string
}


interface props {
    identifier: string,
    setCellTextObj: React.SetStateAction<Function>,
    cellTextObj: IfcCellTextObj,
    index: number,
    cellError?: null | string,
    setCellInputErrorsState?: React.SetStateAction<Function>
}




function RowCellTextInput(props: props) {


    let [inputWidth, setInputWidth] = useState('100%');
    let [inputDefaultWidth, setInputDefaultWidth] = useState<null | number>(null);
    


   



    return (
        <td style={props.cellError ? { verticalAlign: 'top' } : {}}>
            <div className="input-container">
                <input id={`${props.identifier}-${props.index}-input`}
                    type="text" size={10} style={{ width: inputWidth }} value={props.cellTextObj[props.identifier]}
                    onChange={(e) => props.setCellTextObj((oldCellTextObj: IfcCellTextObj) => {
                        console.count('change');
                        let newCellTextObj = Object.assign({}, oldCellTextObj);
                        newCellTextObj[props.identifier] = e.target.value;
                        if (props.setCellInputErrorsState) {
                            props.setCellInputErrorsState((oldCellInputErrorsState: IfcCellInputErrors) => {
                                let newCellInputErrorsState = Object.assign({}, oldCellInputErrorsState);
                                newCellInputErrorsState[props.identifier] = null;
                                return newCellInputErrorsState;
                            })
                        }
                        return newCellTextObj;
                    })} placeholder={props.identifier} />
                <span id={`${props.identifier}-${props.index}-input-width-indicator`} className='input-width-indicator'>
                    {props.cellTextObj[props.identifier]}
                </span>
                <span className='cell-input-error'>
                    {props.cellError!}
                </span>
            </div>
        </td>
    )

    function handleInputWidthResizing() {
        if (inputDefaultWidth === null) {
            let deflt = document.getElementById(`${props.identifier}-${props.index}-input`)!.clientWidth!;
            console.log({deflt}, props.identifier, props.index);
            setInputDefaultWidth(deflt)
        }

        let width: number;
        width = document.getElementById(`${props.identifier}-${props.index}-input-width-indicator`)?.clientWidth!;

        if (width > inputDefaultWidth! && inputDefaultWidth !== null) {

            setInputWidth(width + 'px');
        } else if (width < inputDefaultWidth! ) {
            setInputWidth(inputDefaultWidth! + 'px');
        }
    }
}

export default RowCellTextInput;