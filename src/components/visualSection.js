import React, { PureComponent } from 'react';
import './visualSection.scss';
import { BarChart, YAxis, XAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts';
import { filterBasedOnPercentage, filterBasedOnBenchmark } from '../utils/functions';

class VisualSection extends PureComponent {
    render() {
        const { FirstFile, SecondFile, percentageSales, withBenchmark, benchmarkData } = this.props;

        const totalSales1 = FirstFile.totalOrderedProductSales;
        const totalSales2 = SecondFile.totalOrderedProductSales;

        let FirstFileItems = [];
        let SecondFileItems = [];

        let limitSales1 = (percentageSales / 100) * totalSales1;
        let limitSales2 = (percentageSales / 100) * totalSales2;

        let statusUpdatedFirstFileData = filterBasedOnBenchmark(FirstFile.sortedFileData, SecondFile.sortedFileData, benchmarkData);
        let statusUpdatedSecondFileData = filterBasedOnBenchmark(SecondFile.sortedFileData, FirstFile.sortedFileData, benchmarkData);

        FirstFileItems = filterBasedOnPercentage(statusUpdatedFirstFileData, limitSales1, withBenchmark);
        SecondFileItems = filterBasedOnPercentage(statusUpdatedSecondFileData, limitSales2, withBenchmark);

        // barchart and piechart display data
        let FirstFileSales = [];
        let SecondFileSales = [];

        FirstFileItems.map((item) => {
            let dataItem = {
                name: item.SKU,
                sales: item.OrderedProductSales
            };

            FirstFileSales = FirstFileSales.concat(dataItem);
        });

        SecondFileItems.map((item) => {
            let dataItem = {
                name: item.SKU,
                sales: item.OrderedProductSales
            };

            SecondFileSales = SecondFileSales.concat(dataItem);
        });

        return (
            <div className='VisualSection'>
                <p className='PrimaryTitle'>Final Summary</p>

                <div className='VisualDataSection'>
                    <div className='BarChartSeries'>
                        <p className='VisualDataSection__ChartCaption'>Individual Data: F1 (Sales)</p>
                        <ResponsiveContainer width='100%' height={220}>
                            <BarChart data={FirstFileSales}>
                                <XAxis dataKey="name" />
                                <YAxis hide />
                                <Tooltip />
                                <Bar dataKey="sales" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>

                        <p className='VisualDataSection__ChartCaption'>Individual Data: F2 (Sales)</p>
                        <ResponsiveContainer width='100%' height={220}>
                            <BarChart data={SecondFileSales}>
                                <XAxis dataKey="name" />
                                <YAxis hide />
                                <Tooltip />
                                <Bar dataKey="sales" fill="#b8b5e8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className='BenchmarkSection'>
                        <p>Benchmark SKUs</p>
                        {this.props.benchmarkData.length === 0 ? <p>Nothing to show</p> : this.props.benchmarkData.map((item) => {
                            return (<p className='BenchmarkTile'>{item}</p>)
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default VisualSection;