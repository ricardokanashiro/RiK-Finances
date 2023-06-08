import { chartPallete } from "./utils.js";
import { myBarChart, myPieChart } from "./utils.js";

const userActions = document.querySelector('.header__user-actions');
const hamburguerButton = document.querySelector('.header__hamburger-btn');
const closeButton = document.querySelector('.user-actions__close-menu-btn');

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