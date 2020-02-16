import React, { PureComponent } from 'react';
import './dashboard.scss';
import SidePanel from '../../components/sidePanel';
import ExtendedSegment from '../../components/extendedSegment';

// mock data
import AnalyzedData from '../../mock-data/mock-raw-data.json';
import Axios from 'axios';

class Dashboard extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            analyzedData: AnalyzedData.analyzedData,
            displayFileType: 'first',    // [first, last]
            withBenchmark: false,
            benchmarkData: [
                'C3WLH5429',
                'C3WLH5423',
                'C5BNH8531',
                'F5FNH4012',
            ],
            percentageSales: 100,
        };
    }

    updateFilterStateData = (filterType, filterValue) => {
        if (filterType === 'file') {
            this.setState({ displayFileType: filterValue });
        } else if (filterType === 'benchmark') {
            this.setState({ withBenchmark: filterValue === 'true' ? true : false });
        } else if (filterType === 'percentageSales') {
            this.setState({ percentageSales: filterValue });
        }
    }

    sendFilesToServer = (firstFile, secondFile, thirdFile, fourthFIle) => {
        let fileData = new FormData();
        fileData.append('file', firstFile, 'FirstCostFile.csv');
        fileData.append('file', secondFile, 'SecondCostFile.csv');

        Axios.post('http://localhost:9890/analytics', fileData)
            .then((res) => {
                this.setState({ analyzedData: res.data.analyzedData });
            });
    }

    render() {
        const { analyzedData, displayFileType, withBenchmark, benchmarkData, percentageSales } = this.state;

        return (
            <div className='Dashboard'>
                <SidePanel
                    updateFilterStateData={this.updateFilterStateData}
                    sendFilesToServer={this.sendFilesToServer}
                />

                <ExtendedSegment
                    {...analyzedData}
                    displayFileType={displayFileType}
                    benchmarkData={benchmarkData}
                    withBenchmark={withBenchmark}
                    percentageSales={percentageSales}
                />
            </div>
        );
    }
}

export default Dashboard;
