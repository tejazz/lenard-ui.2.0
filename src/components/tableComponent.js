import React, { memo } from 'react';
import './tableComponent.scss';

const TableComponent = memo((props) => {
    const { headers, tableData } = props;

    const ColumnWidth = {
        width: `${100 / headers.length}%`,
    };

    return (
        <div className='TableComponent'>
            <div className='Row Row--Head'>
                {headers.map((item) => <p className='Column' style={ColumnWidth}>{item.name}</p>)}
            </div>

            <div className='DataRowContainer'>
                {tableData.map((item) => {
                    return (
                        <div className='Row Row--Data'>
                            {headers.map((headItem) => <p className='Column' style={ColumnWidth}>{item[headItem.key]}</p>)}
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

export default TableComponent;