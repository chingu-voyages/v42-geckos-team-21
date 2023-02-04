import { useState, useEffect, MouseEventHandler } from 'react';
import RowCellTextInput from './RowCellTextInput';
import axios from 'axios';
import { IfcUser } from '../../..';
import { text } from 'stream/consumers';
import { IfcCommonJobRowProps } from '../TableView';
import { IfcApplicationFromDb } from '../TableView';
import { MONGOOSE_API_HOST } from '../../..';

interface fullJobProps extends IfcCommonJobRowProps {
    setJobRowState: React.Dispatch<React.SetStateAction<IfcCommonJobRowProps[]>>
}

let timesRendered = 0;



export interface IfcCellInputErrors {
    company: null | string,
    position: null | string,
    date: null | string,
    [key: string]: string | null
};

export interface IfcCellTextObj {
    [key: string]: string | null
}


function Row(props: fullJobProps) {
    let [isEditing, setIsEditing] = useState(props.isInitiallyNew ? true : false);
    let [applicationFromDBState, setApplicationFromDBState] = useState<IfcApplicationFromDb | undefined>(props.applicationFromDb);



    interface IfcCellCheckboxObj {
        [key: string]: boolean
    }

    let [isNewState, setIsNewState] = useState(props.isInitiallyNew);

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




    console.log(', isEditing', props.isInitiallyNew, isEditing);
    console.count('Times Invoked (not necessarily rendered)');

    if (isNewState && isEditing) {
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
                <td style={cellInputErrorsState.date ? { verticalAlign: 'top' } : {}}>
                    <div className='input-container'>
                        <input id={`${props.identifier}-date`} type="date"
                            name={`${props.identifier}-date`}
                            value={cellDate.toISOString().slice(0, 10)}
                            onChange={(e) => { handleDateChange(e, `${props.identifier}-date`) }}
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
                <td className="button-cell"><button onClick={handleConfirmButtonClick}>✔</button></td>
                <td className="button-cell"><button onClick={handleCancelButtonClick}>✖</button></td>
            </tr>
        )
    } else if (!isEditing) {


        if (applicationFromDBState && !cellTextObj.company) {
            // https://stackoverflow.com/questions/17781472/how-to-get-a-subset-of-a-javascript-objects-properties
            let textInputs = (({ company, position, notes }) =>
                ({ company, position, notes }))(applicationFromDBState)
            let checkboxInputs = (({ sentCoverLetter, reachedOut }) =>
                ({ sentCoverLetter, reachedOut }))(applicationFromDBState)

            setCellTextObj(textInputs);
            setCellCheckboxObj(checkboxInputs)
            setCellDate(new Date(applicationFromDBState.date))
        }

        return (
            <tr>
                <td><div className="text-max-width-div">{cellTextObj['company']}</div></td>
                <td><div className="text-max-width-div">{cellTextObj['position']}</div></td>
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
                <td><div className="text-max-width-div left-align">{cellTextObj['notes']}</div></td>
                <td className="button-cell">
                    <button onClick={handleMoreButtonClick}>⋮</button>
                </td>
            </tr>
        )
    } else if (!isNewState && isEditing) {
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
                <td style={cellInputErrorsState.date ? { verticalAlign: 'top' } : {}}>
                    <div className='input-container'>
                        <input id={`${props.identifier}-date`} type="date"
                            name={`${props.identifier}-date`}
                            value={cellDate.toISOString().slice(0, 10)}
                            onChange={(e) => { handleDateChange(e, `${props.identifier}-date`) }}
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
                <td className="button-cell"><button onClick={handleConfirmButtonClick}>✔</button></td>
                <td className="button-cell"><button onClick={handleDeleteButtonClick} title="Delete">
                    <svg data-attribution="trash-can-outline, pictogrammers.com"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Delete</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>
                </button></td>
            </tr>
        )
    } else {
        console.error('Invalid state:',
            `isNewState: ${isNewState}, isEditing: ${isEditing}`);

        return <tr><td colSpan={6}><code>
            ERROR: Invalid state: {
                `isNewState: ${isNewState}, isEditing: ${isEditing}`}
        </code></td></tr>
    }




    function handleDeleteButtonClick(event: React.MouseEvent) {
        deleteRow();
    }

    function handleMoreButtonClick(event: React.MouseEvent) {
        console.log('editing!', props.isInitiallyNew, isEditing)
        setIsEditing(true);
    }

    function handleConfirmButtonClick(event: React.MouseEvent) {
        const [areCellInputsValid, cellInputErrors] = validateFields();


        if (areCellInputsValid) {
            setIsEditing(false);
            if (isNewState) { sendNewRowToDb() }
            else { updateRowInDb() }

        } else {
            console.log(cellInputErrors);
        }
        setCellInputErrorsState(cellInputErrors);

    }

    function handleCancelButtonClick(event: React.MouseEvent) {
        removeRowFromUI();
    }

    function removeRowFromUI() {
        props.setJobRowState(oldJobRowState => {
            return oldJobRowState.filter(element => {
                if (element.identifier === props.identifier) {
                    return false;
                } else {
                    return true;
                }
            })
        });
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
                    if (newCellTextObj[property]) {
                        newCellTextObj[property] = newCellTextObj[property]!.trim();
                    }
                }
                return newCellTextObj;
            })
        }
    }

    function handleDateChange(event: React.ChangeEvent<HTMLInputElement>, dateIdentifier: string) {
        let dateObj = new Date(event.target.value);
        setCellDate(dateObj)
        setCellInputErrorsState((oldCellInputErrorsState: IfcCellInputErrors) => {
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

    function sendNewRowToDb() {


        let reqObj = Object.assign({}, cellTextObj);
        reqObj = Object.assign(reqObj, cellCheckboxObj);

        let userId = props.user!._id;
        reqObj = Object.assign(reqObj, { userId })
        reqObj = Object.assign(reqObj, { date: cellDate.toISOString() })


        axios.post(MONGOOSE_API_HOST + '/api/applications/new', reqObj, { withCredentials: true })
            .then(res => {
                if (res.statusText !== "OK") {
                    throw new Error(res.statusText);
                } else {
                    setIsNewState(false);
                    setApplicationFromDBState(res.data);
                }


            })
            .catch((err) => {
                console.log(err);
                props.setAlertText!(
                    <>
                        <strong>Row {props.identifier}: {err.message}</strong>
                        <p>{err.response ? err.response.data.message : null}</p>
                    </>
                )
                setIsEditing(true);
                props.setAlertKey!((oldAlertKey) => {

                    oldAlertKey++;
                    return oldAlertKey;
                })

            })
    }

    function updateRowInDb() {
        let reqObj = Object.assign({}, cellTextObj);
        reqObj = Object.assign(reqObj, cellCheckboxObj);

        let userId = props.user!._id;
        reqObj = Object.assign(reqObj, { userId })
        reqObj = Object.assign(reqObj, { date: cellDate.toISOString() })


        axios.put(MONGOOSE_API_HOST + `/api/applications/${applicationFromDBState!._id}`,
            reqObj, { withCredentials: true })
            .then(res => {
                console.log('booi', res);
            })
            .catch((err) => {
                console.log(err);
                props.setAlertText!(
                    <>
                        <strong>Row {props.identifier}: {err.message}</strong>
                        <p>{err.response ? err.response.data.message : null}</p>
                    </>
                )
                setIsEditing(true);
                props.setAlertKey!((oldAlertKey) => {

                    oldAlertKey++;
                    return oldAlertKey;
                })

            })
    }

    function deleteRow() {



        axios.delete(MONGOOSE_API_HOST + `/api/applications/${applicationFromDBState!._id}`,
            { withCredentials: true })
            .then(res => {
                if (res.statusText !== "OK") {
                    throw new Error(res.statusText);
                } else {
                    removeRowFromUI();
                }


            })
            .catch((err) => {
                console.error(err);
                props.setAlertText!(
                    <>
                        <strong>Row {props.identifier}: {err.message}</strong>
                        <p>{err.response ? err.response.data.message : null}</p>
                    </>
                )
                setIsEditing(true);
                props.setAlertKey!((oldAlertKey) => {

                    oldAlertKey++;
                    return oldAlertKey;
                })

            })
    }
}



export default Row;