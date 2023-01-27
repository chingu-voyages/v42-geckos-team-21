import { useState, useEffect } from 'react';
interface IfcCellTextObj {
    [key: string]: string
}


interface props {
    identifier: string,
    setCellTextObj: React.SetStateAction<Function>,
    cellTextObj: IfcCellTextObj,
    index: number,
    cellError?: null | string
}




function RowCellTextInput(props: props) {


    let [inputWidth, setInputWidth] = useState('100%');
    let [inputDefaultWidth, setInputDefaultWidth] = useState<null | number>(null);


    let defaultWidth: number | undefined | null;
    useEffect(() => {

        if (inputDefaultWidth === null) {
            setInputDefaultWidth(document.getElementById(`${props.identifier}-${props.index}-input`)!.getBoundingClientRect().width)
        }


        let width: number;
        width = document.getElementById(`${props.identifier}-${props.index}-input-width-indicator`)?.clientWidth!;
        if (width > inputDefaultWidth!) {
            setInputWidth(width + 3 + 'px');
        }





       



    })



    return (
        <td style={props.cellError ? {verticalAlign: 'top'} : {}}>
            <div className="input-container">
                <input id={`${props.identifier}-${props.index}-input`} 
                type="text" style={{ width: inputWidth }} value={props.cellTextObj[props.identifier]}
                onChange={(e) => props.setCellTextObj((oldCellTextObj: IfcCellTextObj) => {
                    let newCellTextObj = Object.assign({}, oldCellTextObj);
                    newCellTextObj[props.identifier] = e.target.value;
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