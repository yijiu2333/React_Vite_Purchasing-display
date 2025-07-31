import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

export default function DualAxisChart({ 
  plannedData = [100, 120, 100], 
  actualData = [85, 78, 25] 
}) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      // Destroy existing chart if it exists
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['装配一', '装配二', '装配三'],
          datasets: [
            {
              label: '计划产出',
              data: plannedData,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              borderRadius: 4,
              categoryPercentage: 0.6,
              barPercentage: 0.7,
              yAxisID: 'y-left'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            'y-left': {
              position: 'left',
              beginAtZero: true,
              title: {
                display: true,
                text: '计划产出'
              }
            },
            'y-right': {
              position: 'right',
              beginAtZero: true,
              max: 150,
              title: {
                display: true,
                text: '实际产出百分比'
              },
              grid: {
                display: false
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              position: 'top'
            },
            tooltip: {
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              titleColor: '#fff',
              bodyColor: '#e2e8f0',
              borderColor: '#334155',
              borderWidth: 1,
              padding: 12,
              cornerRadius: 8,
              mode: 'index',
              intersect: false,
              callbacks: {
                label: function(context) {
                  return context.dataset.label + ': ' + context.raw;
                }
              }
            }
          }
        },
        plugins: [{
          afterDraw: function(chart) {
            const ctx = chart.ctx;
            const chartArea = chart.chartArea;
            const meta = chart.getDatasetMeta(0);
            
            // 绘制水平线和标签
            for (let i = 0; i < chart.data.labels.length; i++) {
              const x = meta.data[i].x;
              const y = meta.data[i].y;
              const height = meta.data[i].height;
              const ratio = (actualData[i] / plannedData[i]) * 100;
              
              // 绘制水平线
              ctx.beginPath();
              ctx.moveTo(x - meta.data[i].width / 2 - 10, y + height / 2);
              ctx.lineTo(x + meta.data[i].width / 2 + 10, y + height / 2);
              ctx.lineWidth = 2;
              ctx.strokeStyle = 'rgba(75, 192, 192, 1)';
              ctx.stroke();
              
              // 绘制标签
              ctx.fillStyle = 'black';
              ctx.font = '12px Arial';
              ctx.textAlign = 'left';
              ctx.fillText(`${ratio.toFixed(1)}%`, x + meta.data[i].width / 2 + 15, y + height / 2 + 4);
            }
          }
        }]
      });

      // Store chart instance on ref for cleanup
      chartRef.current.chart = chart;

      return () => {
        if (chartRef.current?.chart) {
          chartRef.current.chart.destroy();
          chartRef.current.chart = null;
        }
      };
    }
  }, [plannedData, actualData]);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <i className="fa fa-pie-chart text-secondary mr-2"></i>
          车间日计划达成率
        </h2>
        <div className="text-sm text-gray-500">
          本周
        </div>
      </div>
      <div className="h-64">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}