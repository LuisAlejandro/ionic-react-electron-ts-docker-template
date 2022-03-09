import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';


const DataTableSimpleGraph: React.FC = (props: any) => {

  const { data, color } = props;
  const series = [{ data }];

  const options = {
    chart: {
      type: 'area',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      animations:{
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    yaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        show: false
      },
      tooltip: {
        enabled: false
      }
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        show: false
      },
      tooltip: {
        enabled: false
      }
    },
    grid: {
      show: false
    },
    legend: {
      show: false
    },
    tooltip: {
      enabled: true,
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        return (
          '<div class="apexcharts-tooltip-series-group" style="order: 1; display: flex;">' +
          '<div class="apexcharts-tooltip-text" style="font-family: Poppins, sans-serif; font-size: 12px;">' +
          '<span class="apexcharts-tooltip-text-label">' +
          series[seriesIndex][dataPointIndex] +
          '%</span>' +
          '</div>' +
          '</div>'
        );
      }
    },
    colors: [color],
    stroke: {
      show: true,
      curve: 'smooth',
      lineCap: 'round',
    }
  } as ApexOptions;
  
  return (
    <Chart options={options} series={series} height={75} width={110} />
  )
};

export default DataTableSimpleGraph;
