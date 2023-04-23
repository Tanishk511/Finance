
const ctx = document.getElementById('myChart');

const newChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
        datasets: [{
            label: "Expense",
            data: [1220, 2500, 1000, 3000, 5000, 2000, 3000, 5000, 5000, 1500, 1000, 2000, 5000],
            borderWidth: 1,
            barThickness: 25,

        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
        ,
        layout: {
            padding: 20
        }
    }
})

/*
const canvas = document.getElementById('myChart');
const chartData = JSON.parse(canvas.dataset.chartData);
const chartType = canvas.dataset.chartType;

new Chart(canvas, {
  type: chartType,
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: chartData,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});
*/