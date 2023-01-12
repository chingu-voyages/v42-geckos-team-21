import { useState, useEffect } from 'react';

interface props {
    identifier: string,
    setCellTextObj?: React.SetStateAction<Function>
}

interface IfcCellTextObj {
    [key: string]: string
}


function RowCellTextInput(props: props) {


    let [inputText, setInputText] = useState('');
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



        if (props.setCellTextObj) {
        
            props.setCellTextObj((oldCellTextObj: IfcCellTextObj) => {
    
                if (oldCellTextObj[props.identifier] === inputText) {
                    return oldCellTextObj;
                }
                else {
                    oldCellTextObj[props.identifier] = inputText;
                    let newCellTextObj = Object.assign({}, oldCellTextObj);
                
                    
                    return newCellTextObj;
                }
            })
        }


    })



    return (
        <td>
            <div className="input-container">
                <input id={`${props.identifier}-input`} type="text" style={{ width: inputWidth }} onChange={(e) => setInputText(e.target.value)} placeholder={props.identifier} />
                <span id={`${props.identifier}-input-width-indicator`} className='input-width-indicator'>
                    {inputText}
                </span>
            </div>
        </td>
    )
}

export default RowCellTextInput;