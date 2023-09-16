// Chart Pallete

const chartPallete = [
    "#2FB9E0",
    "#409EF7",
    "#2F5CE0",
    "#29459c",
    "#1f3371",
    "#A740F7",
    "#6638D6",
    "#440276",
];

export default {chartPallete};

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

export { myPieChart };

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

export { myBarChart };

function buildPieChartData(categories, property, othersCategory, pieChart) {

  let response = [];

  if(property === 'name') {

    categories.forEach(category => response.push(category.name));

    response.push(othersCategory.name);

    pieChart.data.labels = response;

  } else if(property === 'percentage') {

    categories.forEach(category => response.push(category.percentage));

    response.push(othersCategory.percentage);

    pieChart.data.datasets[0].data = response;

  } else if(property === 'color') {

    categories.forEach(category => response.push(category.color));

    response.push('gray');

    pieChart.data.datasets[0].backgroundColor = response;

  }

  pieChart.update();
}

function buildBarChartData(transactions, property, barChart) {

  let response = [];
  let input = 0;
  let output = 0;

  if(property === 'month') {

    transactions.forEach(month => response.push(month.month));

    barChart.data.labels = response;

  }
  else if(property === 'data') {
    response = [
      {
        label: "Input",
        data: [],
        backgroundColor: "#409EF7"
      },
  
      {
        label: "Output",
        data: [],
        backgroundColor: "#4c49ed",
      },
    ];

    transactions.forEach(month => { month.monthTransactions.forEach(
      transaction => {
        if(transaction.action === 'input') {
  
          input += transaction.value;
  
        } 
        else if(transaction.action === 'output') {
  
          output += transaction.value;
  
        }
      })
      
      response[0].data.push(input);
      response[1].data.push(output);
  
    });

    barChart.data.datasets = response;
    barChart.update();
  }
}

export { buildPieChartData, buildBarChartData };
