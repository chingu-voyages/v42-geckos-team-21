import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './TableView.css';
import Row from './table-components/Row'
import { IfcUser } from '../..';

interface IfcProps {
  user: IfcUser
}



function TableView(props: IfcProps) {
  console.log('tableview render');
  const [jobRowState, setJobRowState] = useState([<Row isNew={true} identifier={0} key={0} user={props.user} />]);

  let [areRowsFromDBParsedState, setAreRowsFromDBParsedState] = useState(false);
  // console.log({areRowsFromDBParsedState});
  
    console.log('useEffect')
    
    if (!areRowsFromDBParsedState) {
      props.user.applications.forEach((element, index) => {

        // https://stackoverflow.com/questions/17781472/how-to-get-a-subset-of-a-javascript-objects-properties
        let applicationFromDb = (({
          company,
          date,
          notes,
          position,
          reachedOut,
          sentCoverLetter
        }) => ({
          company,
          date,
          notes,
          position,
          reachedOut,
          sentCoverLetter
        }))(element)
        setJobRowState(oldJobRowState => {

          let newJobRowState = [...oldJobRowState];
          return newJobRowState.concat(<Row isNew={false} identifier={0} key={oldJobRowState.length} applicationFromDb={applicationFromDb} />)
        })
      })
      setAreRowsFromDBParsedState(true);
    }
  
  
  

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
              oldJobRowState => [<Row isNew={true} identifier={oldJobRowState.length} key={oldJobRowState.length} user={props.user} />].concat(oldJobRowState)
            )}>
              Enter new job&nbsp;
              <svg width="1200pt" height="1200pt" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
                <path d="m951.6 248.4c-194.4-194.4-510-194.4-704.4 0-194.4 194.4-194.4 510 0 704.4s510 194.4 704.4 0c194.4-194.4 194.4-511.2 0-704.4zm-126 380.4c-7.1992 7.1992-18 12-28.801 12h-156v156c0 10.801-4.8008 21.602-12 28.801-7.1992 7.1992-18 12-28.801 12-22.801 0-40.801-18-40.801-40.801v-156h-156c-22.801 0-40.801-18-40.801-40.801s18-40.801 40.801-40.801h156v-156c0-22.801 18-40.801 40.801-40.801s40.801 18 40.801 40.801v156h156c22.801 0 40.801 18 40.801 40.801-1.2031 10.801-4.8008 21.602-12 28.801z" />
              </svg>
            </button></td>
          </tr>
          {jobRowState}



        </tbody>
      </table>

    </div>

  );
}


export default TableView;
