// Chart Pallete

const chartPallete = [
    "#409EF7",
    "#2F5CE0",
    "#2FB9E0",
    "#385FD6",
    "#4C49ED",
    "#6638D6",
    "#A740F7",
];

export { chartPallete };

// Charts Configs

const pieChart = document.getElementById('pieChart');
const barChart = document.getElementById('barChart');

const myPieChart = new Chart(pieChart, {
    type: 'doughnut',
    data: {
        labels: ['Investimento', 'Reserva de Emergência', 'Periféricos', 'Roupas', 'Lazer', 'Outros'],
        datasets: [{
          label: 'Porcentagem por Categoria',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
          backgroundColor: chartPallete,
        }]
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,
    }
});

const myBarChart = new Chart(barChart, {
    type: 'bar',
    data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril'],

        datasets: [
            {
              label: "Input",
              data: [40, 50, 60, 70],
              backgroundColor: "#409EF7"
            },

            {
              label: "Output",
              data: [30, 40, 50, 60],
              backgroundColor: "#4c49ed",
            },
        ],

        borderWidth: 1,
        backgroundColor: chartPallete,
    },
    
    options: {
      responsive: true,
      maintainAspectRatio: false,
    }
});

export { myBarChart, myPieChart };