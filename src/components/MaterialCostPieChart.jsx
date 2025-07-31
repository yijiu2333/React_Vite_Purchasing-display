import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

export default function MaterialCostPieChart() {
  const chartRef = useRef(null);

  // 模拟原料降本占比数据
  const materialData = [
    { name: '魔法甜面包', value: 5.52 },
    { name: '传送门符文', value: 39.09 },
    { name: '传送符文', value: 14.12 },
    { name: '水晶瓶', value: 15.84 },
    { name: '橡树子', value: 1.13 },
    { name: '魔粉', value: 24.30 }
  ];

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      // 销毁现有图表
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      
      const chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: materialData.map(item => item.name),
          datasets: [{
            data: materialData.map(item => item.value),
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 0)',
              'rgba(54, 162, 235, 0)',
              'rgba(255, 206, 86, 0)',
              'rgba(75, 192, 192, 0)',
              'rgba(153, 102, 255, 0)',
              'rgba(255, 159, 64, 0)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right'
            },
            title: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = Math.round((value / total) * 100);
                  return `${label}: ${value}%`;
                }
              }
            }
          }
        },
        plugins: [{
          afterDraw: function(chart) {
              const ctx = chart.ctx;
              const width = chart.width;
              const height = chart.height;
              ctx.font = '20px Arial';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              
              chart.data.datasets.forEach((dataset, i) => {
                const meta = chart.getDatasetMeta(i);
                meta.data.forEach((element, index) => {
                  const data = dataset.data[index];
                  const total = dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = Math.round((data / total) * 100);
                  const label = chart.data.labels[index];
                  
                  const {x, y} = element.tooltipPosition();
                  ctx.fillStyle = '#333';
                  ctx.fillText(`${label}: ${percentage}%`, x, y);
                });
              });
            }
        }]
        
      });
      
      // 存储图表实例以便清理
      chartRef.current.chart = chart;

      return () => {
        if (chartRef.current?.chart) {
          chartRef.current.chart.destroy();
          chartRef.current.chart = null;
        }
      };
    }
  }, []);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <i className="fa fa-pie-chart text-secondary mr-2"></i>
          降本占比分析
        </h2>
      </div>
      <div className="h-[28rem]">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}