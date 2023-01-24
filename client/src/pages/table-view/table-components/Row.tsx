import { useState, useEffect, MouseEventHandler } from 'react';
import RowCellTextInput from './RowCellTextInput';
import axios from 'axios';
import { IfcUser } from '../../..';
import { text } from 'stream/consumers';


let timesRendered = 0;



interface props {
    identifier: number,
    isNew: boolean,
    user?: IfcUser,
    applicationFromDb?: {
        company: string,
        date: string,
        notes: string,
        position: string,
        reachedOut: boolean,
        sentCoverLetter: boolean
    },
    setAlertText?: React.Dispatch<React.SetStateAction<React.ReactNode>>,
    setAlertKey?: React.Dispatch<React.SetStateAction<number>>
}

export interface IfcCellInputErrors {
    company: null | string,
    position: null | string,
    date: null | string,
    [key: string]: string | null
};

function Row(props: props) {
    let [isEditing, setIsEditing] = useState(true);

    interface IfcCellTextObj {
        [key: string]: string
    }


    interface IfcCellCheckboxObj {
        [key: string]: boolean
    }

    let [cellTextObj, setCellTextObj] = useState<IfcCellTextObj>({
        company: '',
        position: '',
        notes: ''
    });
    let [cellDate, setCellDate] = useState(new Date());
    let [cellCheckboxObj, setCellCheckboxObj] = useState<IfcCellCheckboxObj>({
        sentCoverLetter: false,
        reachedOut: false
    });

    

    let [cellInputErrorsState, setCellInputErrorsState] = useState<IfcCellInputErrors>({
        company: null,
        position: null,
        date: null
    });




    console.log({isEditing});
    console.log('props.isNew, isEditing', props.isNew, isEditing);
    console.count('Times Invoked (not necessarily rendered)');
    console.log(cellDate.toISOString().slice(0, 10));

    switch (props.isNew && isEditing) {
        case true:
            return (
                <tr>
                    <RowCellTextInput identifier='company' setCellTextObj={setCellTextObj} cellTextObj={cellTextObj}
                        index={props.identifier}
                        cellError={cellInputErrorsState.company} 
                        setCellInputErrorsState={setCellInputErrorsState}
                    />
                    <RowCellTextInput identifier='position' setCellTextObj={setCellTextObj} cellTextObj={cellTextObj}
                        index={props.identifier}
                        cellError={cellInputErrorsState.position}
                        setCellInputErrorsState={setCellInputErrorsState}
                    />
                    <td style={cellInputErrorsState.date ? {verticalAlign: 'top'} : {}}>
                        <div className='input-container'>
                            <input id={`${props.identifier}-date`} type="date"
                                name={`${props.identifier}-date`}
                                value={cellDate.toISOString().slice(0, 10)}
                                onChange={(e) => {handleDateChange(e, `${props.identifier}-date`)}}
                                max={new Date().toISOString().slice(0, 10)}
                            />
                            <label htmlFor={`${props.identifier}-date`}>
                            </label>
                            <span className='cell-input-error'>
                                {cellInputErrorsState.date}
                            </span>
                        </div>
                    </td>
                    <td>
                        <div className='td-flex-wrapper'>
                            <input id={`${props.identifier}-cover-letter-check-row`} type="checkbox"
                                name={`${props.identifier}-cover-letter-check-row`}
                                checked={cellCheckboxObj['sentCoverLetter']}
                                onChange={(e) => handleCheckboxChange(e, 'sentCoverLetter')}
                            />
                            <label className='check' htmlFor={`${props.identifier}-cover-letter-check-row`}>
                                <svg version="1.1" viewBox="0 0 3600 3600" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m1446.5 2125.8c239.36-397.04 895.74-858.15 1232.3-1096.6l96.023 63.574c-432.11 365.55-976.25 810.56-1120.3 1303.3-96.023 31.781-304.08 143.04-336.09 174.83-112.03-238.4-332.34-575.68-493.37-672.54 304.2-357.64 529.3 40.691 621.41 227.52z" />
                                </svg>
                            </label>
                        </div>
                    </td>
                    <td>
                        <div className='td-flex-wrapper'>
                            <input id={`${props.identifier}-reached-out-check-row`} type="checkbox"
                                name={`${props.identifier}-reached-out-check-row`}
                                checked={cellCheckboxObj['reachedOut']}
                                onChange={(e) => handleCheckboxChange(e, 'reachedOut')}
                            />
                            <label className='check' htmlFor={`${props.identifier}-reached-out-check-row`}>
                                <svg version="1.1" viewBox="0 0 3600 3600" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m1446.5 2125.8c239.36-397.04 895.74-858.15 1232.3-1096.6l96.023 63.574c-432.11 365.55-976.25 810.56-1120.3 1303.3-96.023 31.781-304.08 143.04-336.09 174.83-112.03-238.4-332.34-575.68-493.37-672.54 304.2-357.64 529.3 40.691 621.41 227.52z" />
                                </svg>
                            </label>
                        </div>
                    </td>
                    <RowCellTextInput identifier='notes' setCellTextObj={setCellTextObj} cellTextObj={cellTextObj}
                        index={props.identifier}
                    />
                    <td className="button-cell"><button onClick={handleButtonClick}>✔</button></td>
                    <td className="button-cell"><button>✖</button></td>
                </tr>
            )
        // break;

        case false:
            if (props.applicationFromDb && !cellTextObj.company) {
                // https://stackoverflow.com/questions/17781472/how-to-get-a-subset-of-a-javascript-objects-properties
                let textInputs = (({ company, position, date, notes }) =>
                    ({ company, position, date, notes }))(props.applicationFromDb)
                let checkboxInputs = (({ sentCoverLetter, reachedOut }) =>
                    ({ sentCoverLetter, reachedOut }))(props.applicationFromDb)

                setCellTextObj(textInputs);
                setCellCheckboxObj(checkboxInputs)
            }

            return (
                <tr>
                    <td>{cellTextObj['company']}</td>
                    <td>{cellTextObj['position']}</td>
                    <td>{cellDate.toDateString()}</td>
                    <td>
                        <div className='td-flex-wrapper'>
                            <input disabled id={`${props.identifier}-cover-letter-check-row`} type="checkbox"
                                name={`${props.identifier}-cover-letter-check-row`}
                                checked={cellCheckboxObj['sentCoverLetter']}
                                onChange={(e) => handleCheckboxChange(e, 'sentCoverLetter')}
                            />
                            <label className='check' htmlFor={`${props.identifier}-cover-letter-check-row`}>
                                <svg version="1.1" viewBox="0 0 3600 3600" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m1446.5 2125.8c239.36-397.04 895.74-858.15 1232.3-1096.6l96.023 63.574c-432.11 365.55-976.25 810.56-1120.3 1303.3-96.023 31.781-304.08 143.04-336.09 174.83-112.03-238.4-332.34-575.68-493.37-672.54 304.2-357.64 529.3 40.691 621.41 227.52z" />
                                </svg>
                            </label>
                        </div>
                    </td>
                    <td>
                        <div className='td-flex-wrapper'>
                            <input disabled id={`${props.identifier}-reached-out-check-row`} type="checkbox"
                                name={`${props.identifier}-reached-out-check-row`}
                                checked={cellCheckboxObj['reachedOut']}
                                onChange={(e) => handleCheckboxChange(e, 'reachedOut')}
                            />
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
        const [areCellInputsValid, cellInputErrors] = validateFields();


        if (areCellInputsValid) {
            setIsEditing(false);
            sendRowToDB();
        } else {
            console.log(cellInputErrors);
        }
        setCellInputErrorsState(cellInputErrors);

    }

    function validateFields(): [boolean, IfcCellInputErrors] {
        trimTextInputs();


        let areCellInputsValid = true;



        let cellInputErrors: IfcCellInputErrors = {
            company: null,
            position: null,
            date: null
        }



        if (!cellTextObj.company || cellTextObj.company.length < 1) {
            areCellInputsValid = false;
            cellInputErrors.company = "Company can't be blank."
        }

        if (!cellTextObj.position || cellTextObj.position.length < 1) {
            areCellInputsValid = false;
            cellInputErrors.position = "Position can't be blank."
            console.log('pos blank');
        }

        if (cellDate > new Date()) {
            cellInputErrors.date = "Date can't be in the future."
            areCellInputsValid = false;
        }



        return [areCellInputsValid, cellInputErrors];

        function trimTextInputs() {
            setCellTextObj(oldCellTextObj => {
                let newCellTextObj: IfcCellTextObj = Object.assign({}, oldCellTextObj);
                for (const property in newCellTextObj) {
                    newCellTextObj[property] = newCellTextObj[property].trim();
                }
                console.log({ newCellTextObj });
                return newCellTextObj;
            })
        }
    }

    function handleDateChange(event: React.ChangeEvent<HTMLInputElement>, dateIdentifier: string) {
        console.log('value', event.target.value);
        let dateObj = new Date(event.target.value);
        setCellDate(dateObj)
        setCellInputErrorsState((oldCellInputErrorsState:IfcCellInputErrors) => {
            let newCellInputErrorsState = Object.assign({}, oldCellInputErrorsState);
            newCellInputErrorsState['date'] = null;
            return newCellInputErrorsState;
        })
    }

    function handleCheckboxChange(event: React.ChangeEvent, checkboxIdentifer: string) {
        setCellCheckboxObj((oldCellCheckboxObj => {
            let newCellCheckboxObj = Object.assign({}, oldCellCheckboxObj);
            newCellCheckboxObj[checkboxIdentifer] = !newCellCheckboxObj[checkboxIdentifer];
            return newCellCheckboxObj;
        }))
    }

    function sendRowToDB() {

        let reqObj = Object.assign({}, cellTextObj);
        reqObj = Object.assign(reqObj, cellCheckboxObj);

        let userId = props.user!._id;
        reqObj = Object.assign(reqObj, { userId })
        reqObj = Object.assign(reqObj, { date: cellDate.toISOString() })


        axios.post('http://localhost:3001/api/applications/new', reqObj, { withCredentials: true })
            .then(res => {
                console.log('row axios res', res);
            })
            .catch((err) => {
                console.log(err);
                props.setAlertText!(
                    <>
                        <strong>{err.message}</strong>
                        <p>{err.response ? err.response.data.message : null}</p>
                    </>
                )
                setIsEditing(true);
                props.setAlertKey!((oldAlertKey) => {

                    oldAlertKey++;
                    console.log({ oldAlertKey }, 'row');
                    return oldAlertKey;
                })

            })
    }
}



export default Row;