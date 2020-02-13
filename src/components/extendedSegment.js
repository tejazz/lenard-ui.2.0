import React, { PureComponent } from 'react';
import './extendedSegment.scss';
import { Route, Switch } from 'react-router-dom';
import VisualSection from './visualSection';
import ChartSection from './chartSection';

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
                                <p className='Tile__Count Tile__Count--1'>F1: Rs.{totalSalesF1}</p>
                                <p className='Tile__Count Tile__Count--2'>F2: Rs.{totalSalesF2}</p>
                                <p className='Tile__Percent'>{salesChange}%</p>
                            </div>
                        </div>

                        <div className='TileWrapper'>
                            <div className='Tile'>
                                <p className='Tile__Label'>Average Order Value</p>
                                <p className='Tile__Count Tile__Count--1'>F1: {averageOrderValueF1}</p>
                                <p className='Tile__Count Tile__Count--2'>F2: {averageOrderValueF2}</p>
                                <p className='Tile__Percent'>{averageOrderValueChange}%</p>
                            </div>
                        </div>

                        <div className='TileWrapper'>
                            <div className='Tile'>
                                <p className='Tile__Label'>Conversion Rate</p>
                                <p className='Tile__Count Tile__Count--1'>F1: {conversionRateF1}</p>
                                <p className='Tile__Count Tile__Count--2'>F2: {conversionRateF2}</p>
                                <p className='Tile__Percent'>{conversionChange}%</p>
                            </div>
                        </div>

                        <div className='TileWrapper'>
                            <div className='Tile'>
                                <p className='Tile__Label'>Sales</p>
                                <p className='Tile__Count Tile__Count--1'>F1: {totalUnitsOrderedF1}</p>
                                <p className='Tile__Count Tile__Count--2'>F2: {totalUnitsOrderedF2}</p>
                                <p className='Tile__Percent'>{unitsChange}%</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='RepresentationSection'>
                    <Switch>
                        <Route exact path='/' render={(props) => <VisualSection {...props} {...this.props}/>} />
                        <Route path='/chart' render={() => <ChartSection />} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default ExtendedSegment;
