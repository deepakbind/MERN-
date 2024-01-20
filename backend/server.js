const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());
let database = [];

// Fetch and initialize data from the third-party API
app.get('/api/init', async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        database = response.data;
        res.status(200).json({ message: 'Database initialized successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API to list all transactions with search and pagination
app.get('/api/transactions', (req, res) => {
    const { month, page = 1, perPage = 10, search } = req.query;

    // Filter by month
    const filteredByMonth = database.filter(transaction => new Date(transaction.dateOfSale).getMonth() === parseInt(month, 10));

    // Filter by search text (title/description/price)
    const filteredBySearch = search
        ? filteredByMonth.filter(transaction =>
              transaction.title.toLowerCase().includes(search.toLowerCase()) ||
              transaction.description.toLowerCase().includes(search.toLowerCase()) ||
              transaction.price.toString().includes(search)
          )
        : filteredByMonth;

    // Paginate the results
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedResults = filteredBySearch.slice(startIndex, endIndex);

    res.status(200).json({ transactions: paginatedResults, pagination: { totalItems: filteredBySearch.length, currentPage: parseInt(page, 10) } });
});

// API for statistics
app.get('/api/statistics', (req, res) => {
    const { month } = req.query;

    // Filter by month
    const filteredByMonth = database.filter(transaction => new Date(transaction.dateOfSale).getMonth() === parseInt(month, 10));

    const totalSaleAmount = filteredByMonth.reduce((sum, transaction) => sum + (transaction.sold ? transaction.price : 0), 0);
    const totalSoldItems = filteredByMonth.filter(transaction => transaction.sold).length;
    const totalNotSoldItems = filteredByMonth.filter(transaction => !transaction.sold).length;

    res.status(200).json({ totalSaleAmount, totalSoldItems, totalNotSoldItems });
});

// API for bar chart
app.get('/api/bar-chart', (req, res) => {
    const { month } = req.query;

    // Filter by month
    const filteredByMonth = database.filter(transaction => new Date(transaction.dateOfSale).getMonth() === parseInt(month, 10));

    // Define price ranges
    const priceRanges = [
        { min: 0, max: 100 },
        { min: 101, max: 200 },
        { min: 201, max: 300 },
        { min: 301, max: 400 },
        { min: 401, max: 500 },
        { min: 501, max: 600 },
        { min: 601, max: 700 },
        { min: 701, max: 800 },
        { min: 801, max: 900 },
        { min: 901, max: Number.MAX_VALUE },
    ];

    // Count items in each price range
    const priceRangeCounts = priceRanges.map(range => ({
        range: `${range.min} - ${range.max}`,
        count: filteredByMonth.filter(transaction => transaction.price >= range.min && transaction.price <= range.max).length,
    }));

    res.status(200).json({ chartData: priceRangeCounts });
});

// API for pie chart
app.get('/api/pie-chart', (req, res) => {
    const { month } = req.query;

    // Filter by month
    const filteredByMonth = database.filter(transaction => new Date(transaction.dateOfSale).getMonth() === parseInt(month, 10));

    // Count items in each category
    const categoryCounts = {};

    filteredByMonth.forEach(transaction => {
        const category = transaction.category;
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    const pieChartData = Object.keys(categoryCounts).map(category => ({
        category,
        count: categoryCounts[category],
    }));

    res.status(200).json({ pieChartData });
});

// Combined API
app.get('/api/combined-data', async (req, res) => {
    try {
        const initResponse = await axios.get('http://localhost:3001/api/init');
        const transactionsResponse = await axios.get('http://localhost:3001/api/transactions');
        const statisticsResponse = await axios.get('http://localhost:3001/api/statistics');
        const barChartResponse = await axios.get('http://localhost:3001/api/bar-chart');
        const pieChartResponse = await axios.get('http://localhost:3001/api/pie-chart');

        const combinedData = {
            init: initResponse.data,
            transactions: transactionsResponse.data,
            statistics: statisticsResponse.data,
            barChart: barChartResponse.data,
            pieChart: pieChartResponse.data,
        };

        res.status(200).json(combinedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
