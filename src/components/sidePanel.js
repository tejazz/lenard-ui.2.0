import React, { PureComponent } from 'react';
import './sidePanel.scss';

class SidePanel extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            firstFile: [],
            secondFile: [],
            thirdFile: [],
            fourthFile: [],
        }
    }

    handleFileUpload = (e, fileType) => {
        if (fileType === 'first') {
            this.setState({ firstFile: e.target.files[0] });
        } else if (fileType === 'second') {
            this.setState({ secondFile: e.target.files[0] });
        } else if (fileType === 'third') {
            this.setState({ firstFile: e.target.files[0] });
        } else {
            this.setState({ firstFile: e.target.files[0] });
        }
    }

    sendFilesToServer = () => {
        this.props.sendFilesToServer(this.state.firstFile, this.state.secondFile, '', '');
    }

    render() {
        return (
            <div className='SidePanel'>
                <p className='SidePanel__Title'>Dali - Ekagalaxia</p>

                <div className='InputSection'>
                    <p className='InputSection__Label'>First Cost Sheet</p>
                    <input
                        type='file'
                        name='file'
                        className='InputSection__Input'
                        onChange={(e) => this.handleFileUpload(e, 'first')}
                    />

                    <p className='InputSection__Label'>Second Cost Sheet</p>
                    <input
                        type='file'
                        name='file'
                        className='InputSection__Input'
                        onChange={(e) => this.handleFileUpload(e, 'second')}
                    />

                    <p className='InputSection__Label'>First Spend Sheet</p>
                    <input
                        type='file'
                        name='file'
                        className='InputSection__Input'
                        onChange={(e) => this.handleFileUpload(e, 'third')}
                    />

                    <p className='InputSection__Label'>Second Spend Sheet</p>
                    <input
                        type='file'
                        name='file'
                        className='InputSection__Input'
                        onChange={(e) => this.handleFileUpload(e, 'fourth')}
                    />

                    <button className='InputSection__Button' onClick={this.sendFilesToServer}>Analyze</button>

                    <div className='UploadedFile'>
                        <p className='UploadedFile__Status'>F1: No File Chosen</p>
                        <p className='UploadedFile__Status'>F2: No File Chosen</p>
                        <p className='UploadedFile__Status'>F1 (S): No File Chosen</p>
                        <p className='UploadedFile__Status'>F2 (S): No File Chosen</p>
                    </div>
                </div>

                <div className='FilterSection'>
                    <p className='FilterSection__Title'>Filters</p>

                    <p className='FilterSection__Label'>Percentage Share</p>
                    <select className='FilterSection__Options' onChange={(e) => this.props.updateFilterStateData('percentageSales', e.target.value)} defaultValue='100'>
                        <option value='60'>60%</option>
                        <option value='70'>70%</option>
                        <option value='80'>80%</option>
                        <option value='90'>90%</option>
                        <option value='100'>100%</option>
                    </select>

                    <p className='FilterSection__Label'>Benchmark Status</p>
                    <select className='FilterSection__Options' onChange={(e) => this.props.updateFilterStateData('benchmark', e.target.value)} defaultValue={false}>
                        <option value={true}>With Benchmark</option>
                        <option value={false}>Without Benchmark</option>
                    </select>
                </div>
            </div>
        );
    }
}

export default SidePanel;