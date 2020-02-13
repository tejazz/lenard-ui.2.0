import React, { PureComponent } from 'react';
import './dashboard.scss';
import SidePanel from '../../components/sidePanel';
import ExtendedSegment from '../../components/extendedSegment';

// mock data
import AnalyzedData from '../../mock-data/mock-raw-data.json';

class Dashboard extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            analyzedData: AnalyzedData.analyzedData,
        };
    }

    render() {
        const { analyzedData } = this.state;

        return (
            <div className='Dashboard'>
                <SidePanel />

                <ExtendedSegment {...analyzedData} />
            </div>
        );
    }
}

export default Dashboard;
