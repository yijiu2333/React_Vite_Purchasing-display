import React, { useEffect, useRef } from 'react'
import { Chart } from 'chart.js/auto'

export default function CostReductionChart() {
  const chartRef = useRef(null)
  
  // 模拟12个月降本数据 (0-200之间)
  const monthlyData = [
    185.87, 60.41, 59.68, 51.80
  ];
  
  const months = [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月'
  ];

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')
      
      // Destroy existing chart if it exists
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: months,
          datasets: [{
            label: '月度降本金额',
            data: monthlyData,
            backgroundColor: 'rgba(95, 106, 168, 0.7)',
            borderColor: 'rgba(75, 192, 192, 0)',
            borderWidth: 1,
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 200,
              min: 20,
              grid: {
                display: false
              },
              title: {
                display: false
              }
            },
            x: {
              grid: {
                display: false
              },
              title: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: '2025年月度降本情况'
            },
          }
        },
        plugins: [{
          afterDraw: function(chart) {
            const ctx = chart.ctx;
            const meta = chart.getDatasetMeta(0);
            
            meta.data.forEach((bar, index) => {
              const value = chart.data.datasets[0].data[index];
              const x = bar.x;
              const y = bar.y;
              
              ctx.fillStyle = '#374151';
              ctx.font = 'bold 14px Arial';
              ctx.textAlign = 'center';
              ctx.fillText(value, x, y - 10);
            });
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
  }, [])

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <i className="fa fa-bar-chart text-blue-500 mr-2"></i>
          月度降本情况
        </h2>
        <div className="text-sm text-gray-500">
          2025年度数据
        </div>
      </div>
      {/* <div className="h-80"> */}
      <div className="h-[28rem]">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  )
}
