// // // App.js
// // import React, { useState, useEffect } from 'react';
// // import TransactionsTable from './TransactionsTable';
// // import TransactionsStatistics from './TransactionsStatistics';
// // import TransactionsBarChart from './TransactionsBarChart';

// // const App = () => {
// //     const [selectedMonth, setSelectedMonth] = useState('3'); // Defaulting to March (1-indexed)
// //     const [searchText, setSearchText] = useState('');
// //     const [currentPage, setCurrentPage] = useState(1);
// //     const [transactions, setTransactions] = useState([]);
// //     const [totalItems, setTotalItems] = useState(0);

// //     useEffect(() => {
// //         const fetchTransactions = async () => {
// //             try {
// //                 const response = await fetch(
// //                     `http://localhost:3001/api/transactions?month=${selectedMonth}&page=${currentPage}&search=${searchText}`
// //                 );
// //                 const data = await response.json();
// //                 console.log('Frontend - selectedMonth:', selectedMonth);
// //                 console.log('Frontend - Response Data:', data);
// //                 setTransactions(data.transactions);
// //                 setTotalItems(data.pagination.totalItems);
// //             } catch (error) {
// //                 console.error('Error fetching transactions:', error);
// //             }
// //         };

// //         fetchTransactions();
// //     }, [selectedMonth, currentPage, searchText]);

// //     const handleMonthChange = (event) => {
// //         setSelectedMonth(event.target.value);
// //     };

// //     const handleSearchChange = (event) => {
// //         setSearchText(event.target.value);
// //     };

// //     const handleNextPage = () => {
// //         setCurrentPage((prevPage) => prevPage + 1);
// //     };

// //     const handlePrevPage = () => {
// //         setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
// //     };

// //     return (
// //         <div>
// //             <h1>Transactions Dashboard</h1>

// //             {/* Month dropdown */}
// //             <label>Select Month:</label>
// //             <select value={selectedMonth} onChange={handleMonthChange}>
// //                 {[...Array(12).keys()].map((month) => (
// //                     <option key={month + 1} value={month + 1}>
// //                         {new Date(2022, month).toLocaleString('default', { month: 'long' })}
// //                     </option>
// //                 ))}
// //             </select>

// //             {/* Search box */}
// //             <input type="text" placeholder="Search Transactions" value={searchText} onChange={handleSearchChange} />

// //             {/* Transactions Table */}
// //             <TransactionsTable transactions={transactions} />

// //             {/* Pagination buttons */}
// //             <button onClick={handlePrevPage} disabled={currentPage === 1}>
// //                 Previous
// //             </button>
// //             <button onClick={handleNextPage} disabled={currentPage * 10 >= totalItems}>
// //                 Next
// //             </button>

// //             {/* Transactions Statistics */}
// //             <TransactionsStatistics selectedMonth={selectedMonth} />

// //             {/* Transactions Bar Chart */}
// //             <TransactionsBarChart selectedMonth={selectedMonth} />
// //         </div>
// //     );
// // };

// // export default App;


// // App.js
// import React, { useState, useEffect } from 'react';
// import TransactionsTable from './TransactionsTable';
// import TransactionsStatistics from './TransactionsStatistics';
// import TransactionsBarChart from './TransactionsBarChart';
// // import TransactionsPieChart from './TransactionsPieChart'; // Import this component

// const App = () => {
//     const [selectedMonth, setSelectedMonth] = useState('3'); // Defaulting to March (1-indexed)
//     const [searchText, setSearchText] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [transactions, setTransactions] = useState([]);
//     const [totalItems, setTotalItems] = useState(0);

//     useEffect(() => {
//         const fetchTransactions = async () => {
//             try {
//                 const response = await fetch(
//                     `http://localhost:3001/api/transactions?month=${selectedMonth}&page=${currentPage}&search=${searchText}`
//                 );
//                 const data = await response.json();
//                 console.log('Frontend - selectedMonth:', selectedMonth);
//                 console.log('Frontend - Response Data:', data);
//                 setTransactions(data.transactions);
//                 setTotalItems(data.pagination.totalItems);
//             } catch (error) {
//                 console.error('Error fetching transactions:', error);
//             }
//         };

//         fetchTransactions();
//     }, [selectedMonth, currentPage, searchText]);

//     const handleMonthChange = (event) => {
//         setSelectedMonth(event.target.value);
//     };

//     const handleSearchChange = (event) => {
//         setSearchText(event.target.value);
//     };

//     const handleNextPage = () => {
//         setCurrentPage((prevPage) => prevPage + 1);
//     };

//     const handlePrevPage = () => {
//         setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
//     };

//     return (
//         <div>
//             <h1>Transactions Dashboard</h1>

//             {/* Month dropdown */}
//             <label>Select Month:</label>
//             <select value={selectedMonth} onChange={handleMonthChange}>
//                 {[...Array(12).keys()].map((month) => (
//                     <option key={month + 1} value={month + 1}>
//                         {new Date(2022, month).toLocaleString('default', { month: 'long' })}
//                     </option>
//                 ))}
//             </select>

//             {/* Search box */}
//             <input type="text" placeholder="Search Transactions" value={searchText} onChange={handleSearchChange} />

//             {/* Transactions Table */}
//             <TransactionsTable transactions={transactions} />

//             {/* Pagination buttons */}
//             <button onClick={handlePrevPage} disabled={currentPage === 1}>
//                 Previous
//             </button>
//             <button onClick={handleNextPage} disabled={currentPage * 10 >= totalItems}>
//                 Next
//             </button>

//             {/* Transactions Statistics */}
//             <TransactionsStatistics selectedMonth={selectedMonth} />

//             {/* Transactions Bar Chart */}
//             <TransactionsBarChart selectedMonth={selectedMonth} />

//             {/* Transactions Pie Chart */}
          
//         </div>
//     );
// };

// export default App;






// App.js
import "./hemu.css"
import React, { useState, useEffect } from 'react';
import TransactionsTable from './TransactionsTable';
import TransactionsStatistics from './TransactionsStatistics';
import TransactionsBarChart from './TransactionsBarChart';

const App = () => {
    const [tableMonth, setTableMonth] = useState('3'); // Defaulting to March for the table
    const [statisticsMonth, setStatisticsMonth] = useState(2); // Defaulting to null for the statistics
    const [barChartMonth, setBarChartMonth] = useState(3); // Defaulting to null for the bar chart
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [transactions, setTransactions] = useState([]);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/transactions?month=${tableMonth}&page=${currentPage}&search=${searchText}`
                );
                const data = await response.json();
                console.log('Frontend - Table Month:', tableMonth);
                console.log('Frontend - Response Data:', data);
                setTransactions(data.transactions);
                setTotalItems(data.pagination.totalItems);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, [tableMonth, currentPage, searchText]);

    const handleMonthChange = (event) => {
        const selectedMonth = event.target.value;
        setTableMonth(selectedMonth);
        setStatisticsMonth(null); // Reset statistics month when table month changes
        setBarChartMonth(null); // Reset bar chart month when table month changes
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div className='hemu'>
          <div className="heading"> <h1 className="dashboard">Transactions Dashboard</h1></div>
           
    <div className="monthselection">
            {/* Month dropdown for table */}
            <label>Select Month for Table:</label>
            <select value={tableMonth} onChange={handleMonthChange}>
                {[...Array(12).keys()].map((month) => (
                    <option key={month + 1} value={month + 1}>
                        {new Date(2022, month).toLocaleString('default', { month: 'long' })}
                    </option>
                ))}
            </select>

            {/* Search box */}
            <input type="text" placeholder="Search Transactions" value={searchText} onChange={handleSearchChange} />
            </div>
            {/* Transactions Table */}
            <TransactionsTable transactions={transactions} onSelect={(month) => setStatisticsMonth(month)} />

            {/* Pagination buttons */}
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
            </button>
            <button onClick={handleNextPage} disabled={currentPage * 10 >= totalItems}>
                Next
            </button>
            

<div className="forbar">
            {/* Transactions Statistics */}
            <label>Select Month for Bar Chart:</label>
            <select value={statisticsMonth} onChange={(e) => setStatisticsMonth(e.target.value)}>
                {[...Array(12).keys()].map((month) => (
                    <option key={month + 1} value={month + 1}>
                        {new Date(2022, month).toLocaleString('default', { month: 'long' })}
                    </option>
                ))}
            </select>
            </div>
            {statisticsMonth && (
                <>
                    <h2>Statistics for {statisticsMonth}</h2>
                    <TransactionsStatistics selectedMonth={statisticsMonth} />
                </>
            )}










{/* Month dropdown for bar chart */}
<label>Select Month for Bar Chart:</label>
<select value={barChartMonth} onChange={(e) => setBarChartMonth(e.target.value)}>
    {[...Array(12).keys()].map((month) => (
        <option key={month + 1} value={month + 1}>
            {new Date(2022, month).toLocaleString('default', { month: 'long' })}
        </option>
    ))}
</select>

{/* Transactions Bar Chart */}
{barChartMonth && (
    <>
        <h2>Bar Chart for {barChartMonth}</h2>
        <TransactionsBarChart selectedMonth={barChartMonth} />
    </>
)}











           
        </div>
    );
};

export default App;





