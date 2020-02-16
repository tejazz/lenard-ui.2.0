import React, { PureComponent } from 'react';
import { filterBasedOnPercentage, combineTwoSets, formatNumber, formatDecimalNumber } from '../utils/functions';
import './detailedSection.scss';
import DataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';
import TableComponent from './tableComponent';

class DetailedSection extends PureComponent {
    constructor(props) {
        super(props);
    }

    formatMappingArray = (sortedArray) => {
        let formattedArray = [];

        sortedArray.map((item) => {
            formattedArray = formattedArray.concat({
                'SKU': item.SKU,
                'OrderedProductSales': formatNumber(item.OrderedProductSales),
                'Sessions': formatNumber(item.Sessions),
                'UnitsOrdered': formatNumber(item.UnitsOrdered),
                'AverageOrderValue': formatNumber(item.OrderedProductSales / item.UnitsOrdered),
                'ConversionRate': formatDecimalNumber(item.UnitsOrdered / item.Sessions * 100),
            });
        });

        return formattedArray;
    }

    render() {
        const { FirstFile, SecondFile, percentageSales, withBenchmark } = this.props;

        let limitSalesF1 = (percentageSales / 100) * FirstFile.totalOrderedProductSales;
        let limitSalesF2 = (percentageSales / 100) * SecondFile.totalOrderedProductSales;

        let FirstFileSKUTable = filterBasedOnPercentage(FirstFile.sortedFileData, limitSalesF1, withBenchmark);
        let SecondFileSKUTable = filterBasedOnPercentage(SecondFile.sortedFileData, limitSalesF2, withBenchmark);
        let CombinedSKUTable = combineTwoSets(FirstFileSKUTable, SecondFileSKUTable);

        // map aov and conv.rate for single tables
        FirstFileSKUTable = this.formatMappingArray(FirstFileSKUTable);
        SecondFileSKUTable = this.formatMappingArray(SecondFileSKUTable);

        // table header section 
        const singleTableColumns = [
            { key: 'SKU', name: 'SKU' },
            { key: 'OrderedProductSales', name: 'Sales', sortable: true },
            { key: 'UnitsOrdered', name: 'Units', sortable: true },
            { key: 'Sessions', name: 'Sessions', sortable: true },
            { key: 'AverageOrderValue', name: 'AOV' },
            { key: 'ConversionRate', name: 'Conv. Rate' },
        ];

        const combinedTableColumns = [
            { key: 'SKU', name: 'SKU' },
            { key: 'Sales F1', name: 'Sales F1', sortable: true },
            { key: 'Sales F2', name: 'Sales F2', sortable: true },
            { key: 'Units F1', name: 'Units F1', sortable: true },
            { key: 'Units F2', name: 'Units F2', sortable: true },
            { key: 'Sessions F1', name: 'Sessions F1', sortable: true },
            { key: 'Sessions F2', name: 'Sessions F2', sortable: true },
            { key: 'AOV F1', name: 'AOV F1', sortable: true },
            { key: 'AOV F2', name: 'Sales F1', sortable: true },
            { key: 'Conv Rate F1', name: 'Conv Rate F1', sortable: true },
            { key: 'Conv Rate F2', name: 'Conv Rate F2', sortable: true },
        ]

        return (
            <div className='DetailedSection'>
                <p className='PrimaryTitle'>Tabularized Summary</p>

                <div className='SingleTableSection'>
                    <div className='Table'>
                        <p>Table: F1</p>
                        <TableComponent
                            headers={singleTableColumns}
                            tableData={FirstFileSKUTable}
                        />
                    </div>

                    <div className='Table'>
                        <p>Table: F2</p>
                        <TableComponent
                            headers={singleTableColumns}
                            tableData={SecondFileSKUTable}
                        />
                    </div>
                </div>

                <div className='CombineTableSection'>
                    <p>Combined Table</p>

                    <TableComponent
                        headers={combinedTableColumns}
                        tableData={CombinedSKUTable}
                    />
                </div>
            </div>
        );
    }
}

export default DetailedSection;