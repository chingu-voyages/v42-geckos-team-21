import { useState, useEffect } from 'react';
interface IfcCellTextObj {
    [key: string]: string
}


interface props {
    identifier: string,
    setCellTextObj: React.SetStateAction<Function>,
    cellTextObj: IfcCellTextObj
}




function RowCellTextInput(props: props) {


    let [inputWidth, setInputWidth] = useState('100%');
    let [inputDefaultWidth, setInputDefaultWidth] = useState<null | number>(null);


    let defaultWidth: number | undefined | null;
    useEffect(() => {

        if (inputDefaultWidth === null) {
            setInputDefaultWidth(document.getElementById('company-input')!.getBoundingClientRect().width)
        }


        let width: number;
        width = document.getElementById(`${props.identifier}-input-width-indicator`)?.clientWidth!;
        if (width > inputDefaultWidth!) {
            setInputWidth(width + 3 + 'px');
        }





       



    })



    return (
        <td>
            <div className="input-container">
                <input id={`${props.identifier}-input`} type="text" style={{ width: inputWidth }} onChange={(e) => props.setCellTextObj((oldCellTextObj: IfcCellTextObj) => {
                    let newCellTextObj = Object.assign({}, oldCellTextObj);
                    return newCellTextObj[props.identifier] = e.target.value;
                })} placeholder={props.identifier} />
                <span id={`${props.identifier}-input-width-indicator`} className='input-width-indicator'>
                    {props.cellTextObj[props.identifier]}
                </span>
            </div>
        </td>
    )
}

export default RowCellTextInput;