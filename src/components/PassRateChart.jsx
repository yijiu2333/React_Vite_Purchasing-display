import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

export default function HorizontalBarChart({ 
  rate1 = 95.7, 
  rate2 = 95.9, 
  rate3 = 93.6 
}) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['装配一', '装配二', '装配三'],
          datasets: [{
            data: [rate1, rate2, rate3],
            backgroundColor: [
              'rgba(201, 202, 202, 0.7)',
              'rgba(201, 202, 202, 0.7)',
              'rgba(201, 202, 202, 0.7)'
            ],
            borderWidth: 2,
            borderRadius: 4
          }]
        },
        options: {
           plugins: {
             legend: {
               display: false
             }
           },
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true,
              max: 100,
              grid: { display: false },
              ticks: {
                callback: function(value) {
                  return value + '%';
                }
              }
            },
            y: {
              grid: { display: false }
            }
          }
        },
        plugins: [{
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.raw}%`;
              }
            }
          },
          afterDraw: function(chart) {
            const ctx = chart.ctx;
            const meta = chart.getDatasetMeta(0);
            
            for (let i = 0; i < chart.data.labels.length; i++) {
              const x = meta.data[i].x;
              const y = meta.data[i].y;
              const width = meta.data[i].width;
              const value = chart.data.datasets[0].data[i];
              
              // 绘制数据标签
              ctx.fillStyle = '#374151';
              ctx.font = 'bold 14px Arial';
              ctx.textAlign = 'center';
              ctx.fillText(`${value}%`, x - 30, y + 5);
            }
          }
        }],
      });
      
      chartRef.current.chart = chart;

      return () => {
        if (chartRef.current?.chart) {
          chartRef.current.chart.destroy();
          chartRef.current.chart = null;
        }
      };
    }
  }, [rate1, rate2, rate3]);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <i className="fa fa-chart-bar text-warning mr-2"></i>
          各车间日良率对比
        </h2>
        <div className="text-sm text-gray-500">
          数据截止至2025年6月26日
        </div>
      </div>
      <div className="h-80">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}