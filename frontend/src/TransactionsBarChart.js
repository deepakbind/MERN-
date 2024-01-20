import React, { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const TransactionsBarChart = ({ selectedMonth }) => {
    const chartRef = useRef(null);
    const [barChartData, setBarChartData] = useState(null);

    useEffect(() => {
        let chartInstance = null;

        const fetchBarChartData = async () => {
            try {
                // Destroy the previous chart if it exists
                if (chartInstance) {
                    chartInstance.destroy();
                }

                const response = await fetch(`http://localhost:3001/api/bar-chart?month=${selectedMonth}`);
                const data = await response.json();
                console.log('Frontend - Bar Chart Data:', data);

                if (data.chartData && data.chartData.length > 0) {
                    // Process data
                    const labels = data.chartData.map((entry) => entry.range);
                    const counts = data.chartData.map((entry) => entry.count);

                    // Set bar chart data
                    setBarChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: 'Number of Items',
                                data: counts,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                            },
                        ],
                    });

                    // Check if 'chartRef.current' is not null before creating the chart
                    if (chartRef.current) {
                        // Create a new chart
                        chartInstance = new Chart(chartRef.current, {
                            type: 'bar',
                            data: {
                                labels: labels,
                                datasets: [
                                    {
                                        label: 'Number of Items',
                                        data: counts,
                                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                        borderColor: 'rgba(75, 192, 192, 1)',
                                        borderWidth: 100,
                                        barPercentage: 100, // Adjust this value (default is 0.9)
                                        categoryPercentage: 0.8,
                                      
                                    },
                                ],
                            },
                            options: {
                                scales: {
                                    x: { stacked: true },
                                    y: { stacked: true },
                                },
                                responsive: true,
                                maintainAspectRatio: false, // Set to false to adjust width and height manually
    width: 8000, // Set the desired width
    height: 400, // Se
                            },
                        });
                    } else {
                        console.error('chartRef.current is null. Cannot create the chart.');
                    }
                } else {
                    console.error('Invalid data format received from the API.');
                }
            } catch (error) {
                console.error('Error fetching bar chart data:', error);
            }
        };

        if (selectedMonth) {
            fetchBarChartData();
        }

        // Cleanup the chart on component unmount
        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [selectedMonth, chartRef]);

    return (
        <div className='barchart'>
            {barChartData ? (
                <>
                    <h2>Bar Chart for {selectedMonth}</h2>
                    <Bar  className="barchartmain" ref={chartRef} data={barChartData} />
                </>
            ) : (
                <p>Select a month to view the bar chart</p>
            )}
        </div>
    );
};

export default TransactionsBarChart;
