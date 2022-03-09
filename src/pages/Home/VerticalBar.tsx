import React from 'react';
import { Bar } from 'react-chartjs-2';

const VerticalBar = ({metrics}: any) => {
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // Desde el Backend, estas variables son generadas con bajo el mismo periodo de tiempo, es decir, deberían tener siempre la misma cantidad de datos (meses)
  const { metricsPatients, metricsInsoles, metricsWarranty } = metrics
  
  const formatDataGraphic = (dictionary: Map<string, string>) => {
    const arrayDataInformation: number[] = []
    if(dictionary !== undefined){
      Object.keys(dictionary).forEach((key: string) => {
        // Los meses, vienen desde el back numerados desde el mes 1, por lo tanto al intentar acceder al array de meses se "desplarán" 1. Hay que restar 1.
        const data = dictionary.get(key);
        arrayDataInformation.push(data)
      });
    }

    return arrayDataInformation;
  }

  const formatLabelsGraphic = (dictionary: Map<string, string>) => {
    const arrayOfMonths: string[] = [];
    if(dictionary !== undefined){
      Object.keys(dictionary).forEach(element => {
        // Los meses, vienen desde el back numerados desde el mes 1, por lo tanto al intentar acceder al array de meses se "desplarán" 1. Hay que restar 1.
        const month = element.split("-")[1];
        const monthInterger = parseInt(month) - 1;
        const monthWord = months[monthInterger];
  
        arrayOfMonths.push(monthWord)
      });
    }

    return arrayOfMonths;
  }
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  const data = {
    labels: formatLabelsGraphic(metricsPatients),
    datasets: [
      {
        label: 'Pacientes',
        data: formatDataGraphic(metricsPatients),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Plantillas',
        data: formatDataGraphic(metricsInsoles),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Garantías',
        data: formatDataGraphic(metricsWarranty),
        backgroundColor: 'rgba(93, 210, 55, 0.5)',
      }
    ],
  };

  return (
    <Bar options={options} data={data} height={320} width={1346} />
  )
}

export default VerticalBar;