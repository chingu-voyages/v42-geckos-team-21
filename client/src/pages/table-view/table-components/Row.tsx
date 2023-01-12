import { useState, useEffect, MouseEventHandler } from 'react';
import RowCellTextInput from './RowCellTextInput'

let timesRendered = 0;

interface props {
    identifier: number,
    isNew: boolean
}

function Row(props: props) {
    let [isEditing, setIsEditing] = useState(true);

    interface IfcCellTextObj {
        [key: string]: string
    }

    let [cellTextObj, setCellTextObj] = useState<IfcCellTextObj>({});
   
  
    console.count('Times Invoked (not necessarily rendered)');
    

    switch (props.isNew && isEditing) {
        case true:
            return (
                <tr>
                    <RowCellTextInput identifier='company' setCellTextObj={setCellTextObj} cellTextObj={cellTextObj} index={props.identifier} />
                    <RowCellTextInput identifier='position' setCellTextObj={setCellTextObj} cellTextObj={cellTextObj} index={props.identifier}/>
                    <RowCellTextInput identifier='date' setCellTextObj={setCellTextObj} cellTextObj={cellTextObj} index={props.identifier}/>
                    <td>
                        <div className='td-flex-wrapper'>
                            <input id={`${props.identifier}-cover-letter-check-row`} type="checkbox" name={`${props.identifier}-cover-letter-check-row`} />
                            <label className='check' htmlFor={`${props.identifier}-cover-letter-check-row`}>
                                <svg version="1.1" viewBox="0 0 3600 3600" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m1446.5 2125.8c239.36-397.04 895.74-858.15 1232.3-1096.6l96.023 63.574c-432.11 365.55-976.25 810.56-1120.3 1303.3-96.023 31.781-304.08 143.04-336.09 174.83-112.03-238.4-332.34-575.68-493.37-672.54 304.2-357.64 529.3 40.691 621.41 227.52z" />
                                </svg>
                            </label>
                        </div>
                    </td>
                    <td>
                        <div className='td-flex-wrapper'>
                            <input id={`${props.identifier}-reached-out-check-row`} type="checkbox" name={`${props.identifier}-reached-out-check-row`} />
                            <label className='check' htmlFor={`${props.identifier}-reached-out-check-row`}>
                                <svg version="1.1" viewBox="0 0 3600 3600" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m1446.5 2125.8c239.36-397.04 895.74-858.15 1232.3-1096.6l96.023 63.574c-432.11 365.55-976.25 810.56-1120.3 1303.3-96.023 31.781-304.08 143.04-336.09 174.83-112.03-238.4-332.34-575.68-493.37-672.54 304.2-357.64 529.3 40.691 621.41 227.52z" />
                                </svg>
                            </label>
                        </div>
                    </td>
                    <RowCellTextInput identifier='notes' setCellTextObj={setCellTextObj} cellTextObj={cellTextObj} index={props.identifier}/>
                    <td className="button-cell"><button onClick={handleButtonClick}>✔</button></td>
                    <td className="button-cell"><button>✖</button></td>
                </tr>
            )
        // break;

        case false:
            console.log(cellTextObj);
            return (
                <tr>
                    <td>{cellTextObj['company']}</td>
                    <td>{cellTextObj['position']}</td>
                    <td>{cellTextObj['date']}</td>
                    <td>
                        <div className='td-flex-wrapper'>
                            <input id={`${props.identifier}-cover-letter-check-row`} type="checkbox" name={`${props.identifier}-cover-letter-check-row`} />
                            <label className='check' htmlFor={`${props.identifier}-cover-letter-check-row`}>
                                <svg version="1.1" viewBox="0 0 3600 3600" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m1446.5 2125.8c239.36-397.04 895.74-858.15 1232.3-1096.6l96.023 63.574c-432.11 365.55-976.25 810.56-1120.3 1303.3-96.023 31.781-304.08 143.04-336.09 174.83-112.03-238.4-332.34-575.68-493.37-672.54 304.2-357.64 529.3 40.691 621.41 227.52z" />
                                </svg>
                            </label>
                        </div>
                    </td>
                    <td>
                        <div className='td-flex-wrapper'>
                            <input id={`${props.identifier}-reached-out-check-row`} type="checkbox" name={`${props.identifier}-reached-out-check-row`} />
                            <label className='check' htmlFor={`${props.identifier}-reached-out-check-row`}>
                                <svg version="1.1" viewBox="0 0 3600 3600" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m1446.5 2125.8c239.36-397.04 895.74-858.15 1232.3-1096.6l96.023 63.574c-432.11 365.55-976.25 810.56-1120.3 1303.3-96.023 31.781-304.08 143.04-336.09 174.83-112.03-238.4-332.34-575.68-493.37-672.54 304.2-357.64 529.3 40.691 621.41 227.52z" />
                                </svg>
                            </label>
                        </div>
                    </td>
                    <td>{cellTextObj['notes']}</td>
                    <td className="button-cell"><button>⋮</button></td>
                </tr>
            )
            // break;

            
    }

    function handleButtonClick(event: React.MouseEvent) {
        setIsEditing(false)
    }

}



export default Row;