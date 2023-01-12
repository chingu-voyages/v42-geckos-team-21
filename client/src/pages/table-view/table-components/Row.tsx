import { useState, useEffect } from 'react';
import RowCellTextInput from './RowCellTextInput'

interface props {
    new: boolean
}

function Row(props: props) {
    // console.log(props);
    // let [companyText, setCompanyText] = useState('');
    // let [companyInputWidth, setCompanyInputWidth] = useState('100%');
    // let [companyInputDefaultWidth, setCompanyInputDefaultWidth] = useState<null | number>(null);
    // console.log(companyText);
    // let defaultWidth: number | undefined | null;
    // useEffect(() => {
        
    //     if (companyInputDefaultWidth === null) {
    //         setCompanyInputDefaultWidth(document.getElementById('company-input')!.getBoundingClientRect().width)
    //     }
  
    //     console.log({ defaultWidth, companyInputWidth });
    //     let width: number;
    //     width = document.getElementById('company-input-width-indicator')?.clientWidth!;
    //     if (width > companyInputDefaultWidth!) {
    //         setCompanyInputWidth(width + 3 + 'px');
    //     }

    // })


    switch (props.new) {
        case true:
            return (
                <tr>
                    <RowCellTextInput identifier='company' />
                    <RowCellTextInput identifier='position' />
                    <RowCellTextInput identifier='date' />
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
                    <RowCellTextInput identifier='notes' />
                    <td className="edit-button-cell"><button>⋮</button></td>
                </tr>
            )
        // break;

        default:
            break;
    }

    return (
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
            <td className="edit-button-cell"><button>⋮</button></td>
        </tr>
    )
}

export default Row;