const userActions = document.querySelector('.header__user-actions');
const hamburguerButton = document.querySelector('.header__hamburger-btn');
const closeButton = document.querySelector('.user-actions__close-menu-btn');

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

new Chart(pieChart, {
    type: 'doughnut',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      }
});

new Chart(barChart, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      }
});