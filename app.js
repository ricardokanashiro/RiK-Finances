import { chartPallete } from "./utils.js";

const userActions = document.querySelector('.header__user-actions');
const hamburguerButton = document.querySelector('.header__hamburger-btn');
const closeButton = document.querySelector('.user-actions__close-menu-btn');

const reloadBtn = document.querySelector('#reloadChart');

const pieChart = document.getElementById('pieChart');
const barChart = document.getElementById('barChart');

function showUserActions() {
    console.log('showUserActions');
    userActions.classList.add('active-user-actions');
}

function hideUserActions() {
    console.log('hideUserActions');
    userActions.classList.remove('active-user-actions');
}

hamburguerButton.addEventListener('click', showUserActions);
closeButton.addEventListener('click', hideUserActions);

reloadBtn.onclick = () => {

    myPieChart.data.datasets[0].data = [10, 10, 10, 10, 10, 10];
    myPieChart.update();

    myBarChart.data.datasets[0].data = [10, 10, 10, 10, 10, 10];
    myBarChart.update();
}

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