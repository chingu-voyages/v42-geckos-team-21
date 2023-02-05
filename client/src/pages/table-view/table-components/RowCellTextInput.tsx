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
    let [inputHeight, setInputHeight] = useState('45px');
    let [inputDefaultHeight, setInputDefaultHeight] = useState<null | number>(null);


    let defaultWidth: number | undefined | null;
    useEffect(() => {
        handleInputWidthResizing();
    })



    return (
        <td style={props.cellError ? { verticalAlign: 'top' } : {}}>
            <div className="input-container">
                <textarea id={`${props.identifier}-${props.index}-input`}
                    style={{ width: inputWidth, height: inputHeight }} value={props.cellTextObj[props.identifier]}
                    onChange={(e) => props.setCellTextObj((oldCellTextObj: IfcCellTextObj) => {
                        console.count('change');
                        let newCellTextObj = Object.assign({}, oldCellTextObj);
                        newCellTextObj[props.identifier] = e.target.value.replace(/\n/g, '');
                        if (props.setCellInputErrorsState) {
                            props.setCellInputErrorsState((oldCellInputErrorsState: IfcCellInputErrors) => {
                                let newCellInputErrorsState = Object.assign({}, oldCellInputErrorsState);
                                newCellInputErrorsState[props.identifier] = null;
                                return newCellInputErrorsState;
                            })
                        }
                        return newCellTextObj;
                    })} placeholder={props.identifier}
                    className={(props.identifier === 'notes' ? 'left-align' : '')} />
                <div id={`${props.identifier}-${props.index}-input-dimension-indicator`} className='input-dimension-indicator'>
                    {props.cellTextObj[props.identifier]}
                </div>
                <span className='cell-input-error'>
                    {props.cellError!}
                </span>
            </div>
        </td>
    )

    function handleInputWidthResizing() {
        if (inputDefaultWidth === null) {
            let defltWidth = document.getElementById(`${props.identifier}-${props.index}-input`)!.clientWidth!;
            // getBoundingClientRect() includes border but clientHeight does not!
            let defltHeight = document.getElementById(`${props.identifier}-${props.index}-input`)?.getBoundingClientRect().height!
            console.warn(defltHeight);
            setInputDefaultWidth(defltWidth);
            setInputDefaultHeight(defltHeight);
        }

        let width: number;
        width = document.getElementById(`${props.identifier}-${props.index}-input-dimension-indicator`)?.clientWidth!;
        let height: number;
        height = document.getElementById(`${props.identifier}-${props.index}-input-dimension-indicator`)?.clientHeight!;
        console.log({ height }, props.identifier);

        if (width > inputDefaultWidth! && inputDefaultWidth !== null) {

            setInputWidth(width + 'px');
        } else if (width < inputDefaultWidth!) {
            setInputWidth(inputDefaultWidth! + 'px');
        }

        if (height > inputDefaultHeight! && inputDefaultHeight !== null) {

            setInputHeight(height + 'px');
        } else if (height < inputDefaultHeight!) {
            setInputHeight(inputDefaultHeight! + 'px');
        }

    }
}

export default RowCellTextInput;