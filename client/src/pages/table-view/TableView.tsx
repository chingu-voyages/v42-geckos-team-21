import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './TableView.css';
import Row from './table-components/Row'
import Alert from '../../components/Alert/Alert';
import { IfcUser } from '../..';
import { NullLiteral } from 'typescript';

interface IfcProps {
  user: IfcUser | null
}

export interface IfcApplicationFromDb {
  company: string,
  date: string,
  notes: string,
  position: string,
  reachedOut: boolean,
  sentCoverLetter: boolean,
  _id: string
}


export interface IfcCommonJobRowProps {
  identifier: number,
  isInitiallyNew: boolean,
  key?: number,
  user?: IfcUser,
  applicationFromDb?: IfcApplicationFromDb,
  setAlertText?: React.Dispatch<React.SetStateAction<React.ReactNode>>,
  setAlertKey?: React.Dispatch<React.SetStateAction<number>>
}



function TableView(props: IfcProps) {

  let [alertText, setAlertText] = useState<React.ReactNode>('');
  let [alertKey, setAlertKey] = useState(0);



  const [jobRowState, setJobRowState] = useState<IfcCommonJobRowProps[]>([]);

  let [areRowsFromDBParsedState, setAreRowsFromDBParsedState] = useState(false);


  if (props.user === null) {
    return (
      <div className="TableView">
        <table>
          <thead>
            <tr>
              <th scope="col">Company</th>
              <th scope="col">Position</th>
              <th scope="col">Date Applied</th>
              <th scope="col">Cover Letter</th>
              <th scope="col">Reached Out</th>
              <th scope="col">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr id="add-job-button-row">
              <td colSpan={6}><button onClick={() => setJobRowState(
                oldJobRowState => {
                  let newNumber = oldJobRowState.slice().sort((a, b) => b.identifier - a.identifier)[0].identifier + 1;
                  return ([{
                    identifier: newNumber,
                    isInitiallyNew: true,
                    key: newNumber,
                    user: props.user,
                    setAlertText,
                    setAlertKey
                  }] as IfcCommonJobRowProps[]).concat(oldJobRowState)
                }
              )}>
                Enter new job&nbsp;
                <svg width="1200pt" height="1200pt" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
                  <path d="m951.6 248.4c-194.4-194.4-510-194.4-704.4 0-194.4 194.4-194.4 510 0 704.4s510 194.4 704.4 0c194.4-194.4 194.4-511.2 0-704.4zm-126 380.4c-7.1992 7.1992-18 12-28.801 12h-156v156c0 10.801-4.8008 21.602-12 28.801-7.1992 7.1992-18 12-28.801 12-22.801 0-40.801-18-40.801-40.801v-156h-156c-22.801 0-40.801-18-40.801-40.801s18-40.801 40.801-40.801h156v-156c0-22.801 18-40.801 40.801-40.801s40.801 18 40.801 40.801v156h156c22.801 0 40.801 18 40.801 40.801-1.2031 10.801-4.8008 21.602-12 28.801z" />
                </svg>
              </button></td>
            </tr>
  
            <tr><td colSpan={6}>Loading . . .</td></tr>
  
          </tbody>
        </table>
        <Alert text={alertText} exitAfterDuration={10000} alertKey={alertKey}
          setAlertKey={setAlertKey} />
      </div>
  
    );
  }




  if (!areRowsFromDBParsedState) {
    console.log('RAW DB DATA RECEIVED:', props.user);
    props.user.applications.forEach((element, index) => {

      // https://stackoverflow.com/questions/17781472/how-to-get-a-subset-of-a-javascript-objects-properties
      let applicationFromDb = (({
        company,
        date,
        notes,
        position,
        reachedOut,
        sentCoverLetter,
        _id
      }) => ({
        company,
        date,
        notes,
        position,
        reachedOut,
        sentCoverLetter,
        _id
      }))(element)
      setJobRowState(oldJobRowState => {

        let newJobRowState = [...oldJobRowState];

        return (([{
          identifier: oldJobRowState.length,
          isInitiallyNew: false,
          key: oldJobRowState.length,
          user: props.user,
          setAlertText,
          setAlertKey,
          applicationFromDb
        }] as IfcCommonJobRowProps[]).concat(newJobRowState));
      })
    })

    let newEditableEntry = {
      identifier: props.user.applications.length + 1,
      isInitiallyNew: true,
      key: props.user.applications.length + 1,
      user: props.user,
      setAlertText,
      setAlertKey
    };

    setJobRowState(oldJobRowState => [newEditableEntry, ...oldJobRowState])

    setAreRowsFromDBParsedState(true);
  }



  console.log('####', { jobRowState })
  return (
    <div className="TableView">
      <table>
        <thead>
          <tr>
            <th scope="col">Company</th>
            <th scope="col">Position</th>
            <th scope="col">Date Applied</th>
            <th scope="col">Cover Letter</th>
            <th scope="col">Reached Out</th>
            <th scope="col">Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr id="add-job-button-row">
            <td colSpan={6}><button onClick={() => setJobRowState(
              oldJobRowState => {
                let arrayDescendingByIdentifer = 
                oldJobRowState.slice().sort((a, b) => b.identifier - a.identifier);
                if (arrayDescendingByIdentifer[0]) {
                  var newIdentifier = arrayDescendingByIdentifer[0].identifier + 1;
                } else {
                  var newIdentifier = 0;
                }
                return ([{
                  identifier: newIdentifier,
                  isInitiallyNew: true,
                  key: newIdentifier,
                  user: props.user,
                  setAlertText,
                  setAlertKey
                }] as IfcCommonJobRowProps[]).concat(oldJobRowState)
              }
            )}>
              Enter new job&nbsp;
              <svg width="1200pt" height="1200pt" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
                <path d="m951.6 248.4c-194.4-194.4-510-194.4-704.4 0-194.4 194.4-194.4 510 0 704.4s510 194.4 704.4 0c194.4-194.4 194.4-511.2 0-704.4zm-126 380.4c-7.1992 7.1992-18 12-28.801 12h-156v156c0 10.801-4.8008 21.602-12 28.801-7.1992 7.1992-18 12-28.801 12-22.801 0-40.801-18-40.801-40.801v-156h-156c-22.801 0-40.801-18-40.801-40.801s18-40.801 40.801-40.801h156v-156c0-22.801 18-40.801 40.801-40.801s40.801 18 40.801 40.801v156h156c22.801 0 40.801 18 40.801 40.801-1.2031 10.801-4.8008 21.602-12 28.801z" />
              </svg>
            </button></td>
          </tr>

          {jobRowState.map(element => {
            return <Row {...element} setJobRowState={setJobRowState} />
          })}

        </tbody>
      </table>
      <Alert text={alertText} exitAfterDuration={10000} alertKey={alertKey}
        setAlertKey={setAlertKey} />
    </div>

  );
}


export default TableView;
