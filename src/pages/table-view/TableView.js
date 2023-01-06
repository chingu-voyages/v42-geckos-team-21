import logo from './logo.svg';
import './TableView.css';

function TableView() {
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
          <tr>
            <td>Google</td>
            <td>Front-End Developer</td>
            <td>08/09/22</td>
            <td>
              <div className='td-flex-wrapper'>
                <input id="cover-letter-check-row-1" type="checkbox" name="cover-letter-check-row-1" />
                <label className='check' htmlFor="cover-letter-check-row-1">
                  <svg version="1.1" viewBox="0 0 3600 3600" xmlns="http://www.w3.org/2000/svg">
                    <path d="m1446.5 2125.8c239.36-397.04 895.74-858.15 1232.3-1096.6l96.023 63.574c-432.11 365.55-976.25 810.56-1120.3 1303.3-96.023 31.781-304.08 143.04-336.09 174.83-112.03-238.4-332.34-575.68-493.37-672.54 304.2-357.64 529.3 40.691 621.41 227.52z" />
                  </svg>
                </label>
              </div>
            </td>
            <td>
              <div className='td-flex-wrapper'>
                <input id="reached-out-check-row-1" type="checkbox" name="reached-out-check-row-1" />
                <label className='check' htmlFor="reached-out-check-row-1">
                  <svg version="1.1" viewBox="0 0 3600 3600" xmlns="http://www.w3.org/2000/svg">
                    <path d="m1446.5 2125.8c239.36-397.04 895.74-858.15 1232.3-1096.6l96.023 63.574c-432.11 365.55-976.25 810.56-1120.3 1303.3-96.023 31.781-304.08 143.04-336.09 174.83-112.03-238.4-332.34-575.68-493.37-672.54 304.2-357.64 529.3 40.691 621.41 227.52z" />
                  </svg>
                </label>
              </div>
            </td>
            <td><input type="text" /></td>
          </tr>
          <tr>
            <td>ESPN</td>
            <td>React Developer</td>
            <td>08/09/22</td>
            <td>
              <div className='td-flex-wrapper'>
                <input id="cover-letter-check-row-2" type="checkbox" name="cover-letter-check-row-2" />
                <label className='check' htmlFor="cover-letter-check-row-2">
                  <svg version="1.1" viewBox="0 0 3600 3600" xmlns="http://www.w3.org/2000/svg">
                    <path d="m1446.5 2125.8c239.36-397.04 895.74-858.15 1232.3-1096.6l96.023 63.574c-432.11 365.55-976.25 810.56-1120.3 1303.3-96.023 31.781-304.08 143.04-336.09 174.83-112.03-238.4-332.34-575.68-493.37-672.54 304.2-357.64 529.3 40.691 621.41 227.52z" />
                  </svg>
                </label>
              </div>
            </td>
            <td>
              <div className='td-flex-wrapper'>
                <input id="reached-out-check-row-2" type="checkbox" name="reached-out-check-row-2" />
                <label className='check' htmlFor="reached-out-check-row-2">
                  <svg version="1.1" viewBox="0 0 3600 3600" xmlns="http://www.w3.org/2000/svg">
                    <path d="m1446.5 2125.8c239.36-397.04 895.74-858.15 1232.3-1096.6l96.023 63.574c-432.11 365.55-976.25 810.56-1120.3 1303.3-96.023 31.781-304.08 143.04-336.09 174.83-112.03-238.4-332.34-575.68-493.37-672.54 304.2-357.64 529.3 40.691 621.41 227.52z" />
                  </svg>
                </label>
              </div>
            </td>
            <td><input type="text" /></td>
          </tr>
          <tr>
            <td colSpan={6}><button>
              Enter new job&nbsp;
              <svg width="1200pt" height="1200pt" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
                <path d="m951.6 248.4c-194.4-194.4-510-194.4-704.4 0-194.4 194.4-194.4 510 0 704.4s510 194.4 704.4 0c194.4-194.4 194.4-511.2 0-704.4zm-126 380.4c-7.1992 7.1992-18 12-28.801 12h-156v156c0 10.801-4.8008 21.602-12 28.801-7.1992 7.1992-18 12-28.801 12-22.801 0-40.801-18-40.801-40.801v-156h-156c-22.801 0-40.801-18-40.801-40.801s18-40.801 40.801-40.801h156v-156c0-22.801 18-40.801 40.801-40.801s40.801 18 40.801 40.801v156h156c22.801 0 40.801 18 40.801 40.801-1.2031 10.801-4.8008 21.602-12 28.801z" />
              </svg>
            </button></td>
          </tr>
        </tbody>
      </table>

    </div>
  );
}

export default TableView;
