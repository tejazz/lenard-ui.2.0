import numeral from 'numeral';

const filterBasedOnPercentage = (sortedArray, limitSales, withBenchmark) => {
    let filteredArray = [];
    let checkSales = 0;

    sortedArray.map((item) => {
        if (checkSales <= limitSales && (checkSales + unFormatNumber(item.OrderedProductSales)) <= limitSales) {
            if (withBenchmark) {
                if (item.Status === 0 || item.Status === 2) {
                    checkSales += unFormatNumber(item.OrderedProductSales);
                    filteredArray = filteredArray.concat(item);
                }
            } else {
                checkSales += unFormatNumber(item.OrderedProductSales);
                filteredArray = filteredArray.concat(item);
            }
        }
    });

    return filteredArray;
}

const filterBasedOnBenchmark = (firstSet, secondSet, benchmarkSet) => {
    // status codes: [0: current && second && benchmark, 1: current && second, 2: current && benchmark, 3: current]
    let updatedSet = [];

    firstSet.map((item) => {
        const benchmarkIndex = benchmarkSet.findIndex((el) => el === item.SKU);
        const secondSetIndex = secondSet.findIndex((el) => el.SKU === item.SKU);

        if (benchmarkIndex > -1 && secondSetIndex > -1) {
            item.Status = 0;
        } else if (benchmarkIndex === -1 && secondSetIndex === -1) {
            item.Status = 1;
        } else if (benchmarkIndex > -1 && secondSetIndex === -1) {
            item.Status = 2;
        } else {
            item.Status = 3;
        }

        updatedSet = updatedSet.concat(item);
    });

    return updatedSet;
}

const formatNumber = (value) => {
    return numeral(value).format('0,0');
}

const formatDecimalNumber = (value) => {
    return numeral(value).format('0,0.00');
}

const unFormatNumber = (value) => {
    return (typeof value === 'string') ? parseInt(value.replace(',', '')) : value;
}

const combineTwoSets = (firstSet, secondSet) => {
    let combinedSet = [];

    firstSet.map((item) => {
        const secondSetIndex = secondSet.findIndex((el) => el.SKU === item.SKU);

        const secondItem = secondSet[secondSetIndex];

        combinedSet = combinedSet.concat({
            'SKU': item.SKU,
            'Sales F1': formatNumber(item.OrderedProductSales),
            'Sales F2': (secondSetIndex === -1) ? '' : formatNumber(secondItem.OrderedProductSales),
            'Sessions F1': formatNumber(item.Sessions),
            'Sessions F2': (secondSetIndex === -1) ? '' : formatNumber(secondItem.Sessions),
            'Units F1': formatNumber(item.UnitsOrdered),
            'Units F2': (secondSetIndex === -1) ? '' : formatNumber(secondItem.UnitsOrdered),
            'AOV F1': formatNumber(item.OrderedProductSales / item.UnitsOrdered),
            'AOV F2': (secondSetIndex === -1) ? '' : formatNumber(secondItem.OrderedProductSales / secondItem.UnitsOrdered),
            'Conv Rate F1': formatDecimalNumber(item.UnitsOrdered / item.Sessions * 100),
            'Conv Rate F2': (secondSetIndex === -1) ? '' : formatDecimalNumber(secondItem.UnitsOrdered / secondItem.Sessions * 100)
        });
    });

    // adding all remaining second set values
    secondSet.map((item) => {
        const combinedSetIndex = combinedSet.findIndex((el) => el.SKU === item.SKU);

        if (combinedSetIndex === -1) {
            combinedSet = combinedSet.concat({
                'SKU': item.SKU,
                'Sales F1': '',
                'Sales F2': formatNumber(item.OrderedProductSales),
                'Sessions F1': '',
                'Sessions F2': formatNumber(item.Sessions),
                'Units F1': '',
                'Units F2': formatNumber(item.UnitsOrdered),
                'AOV F1': '',
                'AOV F2': formatNumber(item.OrderedProductSales / item.UnitsOrdered * 100),
                'Conv Rate F1': '',
                'Conv Rate F2': formatDecimalNumber(item.UnitsOrdered / item.Sessions * 100)
            });
        }
    });

    return combinedSet;
}

export {
    filterBasedOnPercentage,
    combineTwoSets,
    formatNumber,
    formatDecimalNumber,
    filterBasedOnBenchmark,
}