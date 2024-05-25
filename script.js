const dateDropdown = document.getElementById('date-dropdown');
const temperatureChart = document.getElementById('temperatureChart');

let chart;

fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&forecast_days=1')
  .then(response => response.json())
  .then(data => {
    const dates = data.hourly.time.filter(date => date.startsWith('2024-05-25'));
    const temperatures = data.hourly.temperature_2m.filter((_, index) => dates.includes(data.hourly.time[index]));

    const option = document.createElement('option');
    option.value = '0';
    option.text = '2024-05-25';
    dateDropdown.add(option);

    dateDropdown.addEventListener('change', () => {
      updateChart(temperatures);
    });
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
  });

function updateChart(temperatures) {
  if (chart) {
    chart.destroy();
  }

  const chartData = {
    labels: Array.from({ length: temperatures.length }, (_, index) => `${index}:00`),
    datasets: [
      {
        label: 'Temperature',
        data: temperatures,
        backgroundColor: '#03045e',
        borderColor: '#03045e',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  chart = new Chart(temperatureChart, {
    type: 'line',
    data: chartData,
    options: chartOptions
  });
}
