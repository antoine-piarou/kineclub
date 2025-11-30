import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

interface Props {
    playerScores: { category: string; value: number }[];
    teamScores: { category: string; value: number }[];
}

export const RadarChart: React.FC<Props> = ({ playerScores, teamScores }) => {
    const labels = playerScores.map(s => s.category);
    const playerData = playerScores.map(s => s.value);
    const teamData = teamScores.map(s => s.value);

    const data = {
        labels,
        datasets: [
            {
                label: 'JOUEUR',
                data: playerData,
                backgroundColor: 'rgba(255, 89, 0, 0.07)',
                borderColor: 'rgb(234, 88, 12)',
                borderWidth: 2,
                pointBackgroundColor: 'rgb(234, 88, 12)',
                pointBorderColor: '#fff',
                pointBorderWidth: 1,
                pointRadius: 3,
            },
            {
                label: 'EQUIPE',
                data: teamData,
                backgroundColor: 'rgba(0, 255, 234, 0.11)',
                borderColor: 'rgb(13, 148, 136)',
                borderWidth: 2,
                pointBackgroundColor: 'rgb(13, 148, 136)',
                pointBorderColor: '#fff',
                pointBorderWidth: 1,
                pointRadius: 3,
            },
        ],
    };

    const options = {
        scales: {
            r: {
                angleLines: {
                    display: true,
                    color: '#d1d5db',
                    lineWidth: 1,
                },
                suggestedMin: 0,
                suggestedMax: 10,
                ticks: {
                    stepSize: 2,
                    backdropColor: 'transparent',
                    color: '#4b5563',
                    font: {
                        size: 10,
                    },
                },
                grid: {
                    color: '#e5e7eb',
                    lineWidth: 1,
                },
                pointLabels: {
                    font: {
                        size: 11,
                        weight: 500,
                    },
                    color: '#1f2937',
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
            },
        },
        maintainAspectRatio: true,
        responsive: true,
    };

    return <Radar data={data} options={options} />;
};
