// TransactionsStatistics.js
import React, { useState, useEffect } from 'react';

const TransactionsStatistics = ({ selectedMonth }) => {
    const [statistics, setStatistics] = useState({
        totalSaleAmount: 0,
        totalSoldItems: 0,
        totalNotSoldItems: 0,
    });

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/statistics?month=${selectedMonth}`);
                const data = await response.json();
                setStatistics(data);
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };

        if (selectedMonth) {
            fetchStatistics();
        }
    }, [selectedMonth]);

    return (
        <div className='stics'>
            <h3>Statistics</h3>
            {selectedMonth ? (
                <>
                    <p>Total Sale Amount: ${statistics.totalSaleAmount.toFixed(2)}</p>
                    <p>Total Sold Items: {statistics.totalSoldItems}</p>
                    <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
                </>
            ) : (
                <p>Select a month to view statistics.</p>
            )}
        </div>
    );
};

export default TransactionsStatistics;
