import { useState, useEffect } from 'react';

interface props {
    identifier: string
}

function RowCellTextInput(props: props) {
    console.log(props);

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