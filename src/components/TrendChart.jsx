import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler // Import Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler // Register Filler
);

const TrendChart = ({ trendData }) => {
    if (!trendData) return null;

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top', labels: { font: { family: 'Prompt' } } },
            tooltip: {
                mode: 'index',
                intersect: false,
                titleFont: { family: 'Prompt' },
                bodyFont: { family: 'Prompt' }
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                min: 60,
                max: 100,
                grid: { color: '#f1f5f9' },
                ticks: { font: { family: 'Prompt' } }
            },
            x: {
                grid: { display: false },
                ticks: { font: { family: 'Prompt' } }
            }
        }
    };

    const data = {
        labels: trendData.labels,
        datasets: [
            {
                label: 'ผลงานจริง (Actual)',
                data: trendData.actual,
                borderColor: '#3b82f6', // blue-500
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#3b82f6',
                pointBorderWidth: 2,
                pointRadius: 4
            },
            {
                label: 'เป้าหมาย (Target)',
                data: trendData.target,
                borderColor: '#94a3b8', // slate-400
                borderWidth: 2,
                borderDash: [5, 5],
                tension: 0.1,
                fill: false,
                pointRadius: 0
            }
        ]
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">แนวโน้มผลการดำเนินงาน (รายเดือน)</h3>
                <select
                    className="bg-gray-50 border border-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2">
                    <option>ปี 2026</option>
                    <option>ปี 2025</option>
                </select>
            </div>
            <div className="relative h-72 w-full">
                <Line options={options} data={data} />
            </div>
        </div>
    );
};

export default TrendChart;
