import React, { PureComponent } from 'react';
import './extendedSegment.scss';
import VisualSection from './visualSection';
import Numeral from 'numeral';
import DetailedSection from './detailedSection';

class ExtendedSegment extends PureComponent {
    render() {
        const { FirstFile, SecondFile } = this.props;

        // extract total parameters
        const totalSalesF1 = FirstFile.totalOrderedProductSales;
        const totalSalesF2 = SecondFile.totalOrderedProductSales;
        const salesChange = (((totalSalesF2 - totalSalesF1) / totalSalesF1) * 100).toFixed(2);

        const totalUnitsOrderedF1 = FirstFile.totalUnitsOrdered;
        const totalUnitsOrderedF2 = SecondFile.totalUnitsOrdered;
        const unitsChange = (((totalUnitsOrderedF2 - totalUnitsOrderedF1) / totalUnitsOrderedF1) * 100).toFixed(2);

        const totalSessionsF1 = FirstFile.totalSessions;
        const totalSessionsF2 = SecondFile.totalSessions;
        const sessionsChange = (((totalSessionsF2 - totalSessionsF1) / totalSessionsF1) * 100).toFixed(2);

        const averageOrderValueF1 = (totalSalesF1 / totalUnitsOrderedF1).toFixed(2);
        const averageOrderValueF2 = (totalSalesF2 / totalUnitsOrderedF2).toFixed(2);
        const averageOrderValueChange = (((parseFloat(averageOrderValueF2) - parseFloat(averageOrderValueF1)) / parseFloat(averageOrderValueF1)) * 100).toFixed(2);

        const conversionRateF1 = ((totalUnitsOrderedF1 / totalSessionsF1) * 100).toFixed(2);
        const conversionRateF2 = ((totalUnitsOrderedF2 / totalSessionsF2) * 100).toFixed(2);
        const conversionChange = (((conversionRateF2 - conversionRateF1) / conversionRateF1) * 100).toFixed(2);

        return (
            <div className='ExtendedSegment'>
                <div className='EssentialKPI'>
                    <p className='PrimaryTitle'>Essential KPI</p>
                    <div className='TileContainer'>
                        <div className='TileWrapper'>
                            <div className='Tile'>
                                <p className='Tile__Label'>Sales</p>
                                <p className='Tile__Count Tile__Count--1'>F1: <span className='Tile__Primary'>&#8377;{Numeral(totalSalesF1).format('0,0')}</span></p>
                                <p className='Tile__Count Tile__Count--2'>F2: <span className='Tile__Primary'>&#8377;{Numeral(totalSalesF2).format('0,0')}</span></p>
                                <p className='Tile__Percent'>{salesChange}%</p>
                            </div>
                        </div>

                        <div className='TileWrapper'>
                            <div className='Tile'>
                                <p className='Tile__Label'>Average Order Value</p>
                                <p className='Tile__Count Tile__Count--1'>F1: <span className='Tile__Primary'>{Numeral(averageOrderValueF1).format('0,0.00')}</span></p>
                                <p className='Tile__Count Tile__Count--2'>F2: <span className='Tile__Primary'>{Numeral(averageOrderValueF2).format('0,0.00')}</span></p>
                                <p className='Tile__Percent'>{averageOrderValueChange}%</p>
                            </div>
                        </div>

                        <div className='TileWrapper'>
                            <div className='Tile'>
                                <p className='Tile__Label'>Conversion Rate</p>
                                <p className='Tile__Count Tile__Count--1'>F1: <span className='Tile__Primary'>{Numeral(conversionRateF1).format('0,0.00')}</span></p>
                                <p className='Tile__Count Tile__Count--2'>F2: <span className='Tile__Primary'>{Numeral(conversionRateF2).format('0,0.00')}</span></p>
                                <p className='Tile__Percent'>{conversionChange}%</p>
                            </div>
                        </div>

                        <div className='TileWrapper'>
                            <div className='Tile'>
                                <p className='Tile__Label'>Units Ordered</p>
                                <p className='Tile__Count Tile__Count--1'>F1: <span className='Tile__Primary'>{Numeral(totalUnitsOrderedF1).format('0,0')}</span></p>
                                <p className='Tile__Count Tile__Count--2'>F2: <span className='Tile__Primary'>{Numeral(totalUnitsOrderedF2).format('0,0')}</span></p>
                                <p className='Tile__Percent'>{unitsChange}%</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='RepresentationSection'>
                    <VisualSection {...this.props} />

                    <DetailedSection {...this.props} />
                </div>
            </div>
        );
    }
}

export default ExtendedSegment;
