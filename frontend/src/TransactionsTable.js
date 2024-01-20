// TransactionsTable.js
import React from 'react';
import "./hemu.css"
const TransactionsTable = ({ transactions }) => {
    return (
        <div>
            {/* <h4 className='table'>Transactions Dashboard</h4> */}
            <table className='ta'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody className="ta" >
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.title}</td>
                            <td>${transaction.price}</td>
                            <td>{transaction.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionsTable;
