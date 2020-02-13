import React, { PureComponent } from 'react';
import './visualSection.scss';
import { BarChart, YAxis, XAxis, Tooltip, Bar, PieChart, Pie } from 'recharts';

class VisualSection extends PureComponent {
    mapFileItems = (sortedArray, limitSales, totalSales) => {
        let filteredArray = [];
        let checkSales = 0;
        // const { withBenchmark } = this.state;
        let withBenchmark = false;

        sortedArray.map((item) => {
            if (checkSales < limitSales) {
                if (withBenchmark) {
                    if (item.PresentStatus === 1 || item.PresentStatus === 3) {
                        checkSales += item.OrderedProductSales;
                        filteredArray = filteredArray.concat(item);
                    }
                } else {
                    checkSales += item.OrderedProductSales;
                    filteredArray = filteredArray.concat(item);
                }
            }
        });

        return filteredArray;
    }

    render() {
        console.log(this.props);
        const { FirstFile, SecondFile } = this.props;
        let percentageSales = 60;

        const totalSales1 = FirstFile.totalOrderedProductSales;
        const totalSales2 = SecondFile.totalOrderedProductSales;

        let FirstFileItems = [];
        let SecondFileItems = [];

        let limitSales1 = (percentageSales / 100) * totalSales1;
        let limitSales2 = (percentageSales / 100) * totalSales2;

        // if (fileType === 'both') {
        FirstFileItems = this.mapFileItems(FirstFile.sortedFileData, limitSales1, totalSales1);
        SecondFileItems = this.mapFileItems(SecondFile.sortedFileData, limitSales2, totalSales2);
        // } else if (fileType === 'first') {
        //     FirstFileItems = this.mapFileItems(FirstFile.sortedFileData, limitSales1, totalSales1);
        //     SecondFileItems = SecondFile.sortedFileData.slice(0, 20);
        // } else if (fileType === 'second') {
        //     FirstFileItems = FirstFile.sortedFileData.slice(0, 20);
        //     SecondFileItems = this.mapFileItems(SecondFile.sortedFileData, limitSales2, totalSales2);
        // }

        let combinedTable = [];

        FirstFileItems.map((item) => {
            let combineTableObject = {};

            const findSecondTableIndex = SecondFileItems.findIndex((el) => el.SKU === item.SKU);

            if (findSecondTableIndex > -1) {
                combineTableObject = {
                    "SKU": item.SKU,
                    "Sales F1": item.OrderedProductSales,
                    "Sales F2": SecondFileItems[findSecondTableIndex].OrderedProductSales,
                    "Units F1": item.UnitsOrdered,
                    "Units F2": SecondFileItems[findSecondTableIndex].UnitsOrdered,
                    "Sessions F1": item.Sessions,
                    "Sessions F2": SecondFileItems[findSecondTableIndex].Sessions,
                    "AOV F1": (item.OrderedProductSales / item.UnitsOrdered).toFixed(2),
                    "AOV F2": (SecondFileItems[findSecondTableIndex].OrderedProductSales / SecondFileItems[findSecondTableIndex].UnitsOrdered).toFixed(2),
                    "Conv.Rate F1": ((item.UnitsOrdered / item.Sessions) * 100).toFixed(2),
                    "Conv.Rate F2": ((SecondFileItems[findSecondTableIndex].UnitsOrdered / SecondFileItems[findSecondTableIndex].Sessions) * 100).toFixed(2),
                }
            } else {
                combineTableObject = {
                    "SKU": item.SKU,
                    "Sales F1": item.OrderedProductSales,
                    "Sales F2": '',
                    "Units F1": item.UnitsOrdered,
                    "Units F2": '',
                    "Sessions F1": item.Sessions,
                    "Sessions F2": '',
                    "AOV F1": (item.OrderedProductSales / item.UnitsOrdered).toFixed(2),
                    "AOV F2": '',
                    "Conv.Rate F1": ((item.UnitsOrdered / item.Sessions) * 100).toFixed(2),
                    "Conv.Rate F2": '',
                }
            }

            console.log(combineTableObject);

            combinedTable = combinedTable.concat(combineTableObject);
        });

        // add remaining second table data
        SecondFileItems.map((item) => {
            let combineTableObject = {};
            const indexInExistingTable = combinedTable.findIndex((el) => el.SKU === item.SKU);

            if (indexInExistingTable === -1) {
                combineTableObject = {
                    "SKU": item.SKU,
                    "Sales F2": item.OrderedProductSales,
                    "Sales F1": '',
                    "Units F2": item.UnitsOrdered,
                    "Units F1": '',
                    "Sessions F2": item.Sessions,
                    "Sessions F1": '',
                    "AOV F2": (item.OrderedProductSales / item.UnitsOrdered).toFixed(2),
                    "AOV F1": '',
                    "Conv.Rate F2": ((item.UnitsOrdered / item.Sessions) * 100).toFixed(2),
                    "Conv.Rate F1": '',
                }

                combinedTable = combinedTable.concat(combineTableObject);
            }
        });

        return (
            <div className='VisualSection'>
                <p className='PrimaryTitle'>Final Summary</p>

                <div className='VisualDataSection'>
                    <div className='BarChartSeries'>
                        Bar Chart
                    </div>

                    <div className='PieChartSeries'>
                        Pie Chart
                    </div>
                </div>
            </div>
        );
    }
}

export default VisualSection;