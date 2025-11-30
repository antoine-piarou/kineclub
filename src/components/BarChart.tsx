import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface Props {
    playerMetrics: { name: string; value: string | number }[];
    teamMetrics: { name: string; value: string | number }[];
}

export const BarChart: React.FC<Props> = ({ playerMetrics, teamMetrics }) => {
    const labels = playerMetrics.map(m => m.name);
    const playerData = playerMetrics.map(m => typeof m.value === 'number' ? m.value : parseFloat(m.value as string) || 0);
    const teamData = teamMetrics.map(m => typeof m.value === 'number' ? m.value : parseFloat(m.value as string) || 0);

    const data = {
        labels,
        datasets: [
            {
                label: 'JOUEUR',
                data: playerData,
                backgroundColor: '#1e3a8a',
                borderColor: '#1e3a8a',
                borderWidth: 1,
            },
            {
                label: 'EQUIPE',
                data: teamData,
                backgroundColor: '#dc2626',
                borderColor: '#dc2626',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 10,
                ticks: {
                    stepSize: 1,
                },
                grid: {
                    color: '#e5e7eb',
                },
            },
            x: {
                ticks: {
                    font: {
                        size: 9,
                    },
                    maxRotation: 45,
                    minRotation: 45,
                },
                grid: {
                    display: false,
                },
            },
        },
    };

    return <Bar data={data} options={options} />;
};
