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


    let defaultWidth: number | undefined | null;
    useEffect(() => {
        console.log({inputDefaultWidth}, props.identifier);
        if (inputDefaultWidth === null) {
            setInputDefaultWidth(document.getElementById(`${props.identifier}-${props.index}-input`)!.getBoundingClientRect().width)
        }


        let width: number;
        width = document.getElementById(`${props.identifier}-${props.index}-input-width-indicator`)?.clientWidth!;
        console.log({width}, props.identifier);
        if (width > inputDefaultWidth! && inputDefaultWidth !== null) {
            console.log('rose disapproves');
            setInputWidth(width + 3 + 'px');
        } else if (width < inputDefaultWidth!) {
            setInputWidth(inputDefaultWidth! + 3 + 'px');
        }









    })



    return (
        <td style={props.cellError ? { verticalAlign: 'top' } : {}}>
            <div className="input-container">
                <input id={`${props.identifier}-${props.index}-input`}
                    type="text" style={{ width: inputWidth }} value={props.cellTextObj[props.identifier]}
                    onChange={(e) => props.setCellTextObj((oldCellTextObj: IfcCellTextObj) => {
                        console.count('change');
                        let newCellTextObj = Object.assign({}, oldCellTextObj);
                        newCellTextObj[props.identifier] = e.target.value;
                        if (props.setCellInputErrorsState) {
                            props.setCellInputErrorsState((oldCellInputErrorsState:IfcCellInputErrors) => {
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
}

export default RowCellTextInput;