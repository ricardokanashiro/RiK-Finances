import { chartPallete } from "./utils.js";
import { myBarChart, myPieChart } from "./utils.js";

const userActions = document.querySelector('.header__user-actions');
const hamburguerButton = document.querySelector('.header__hamburger-btn');
const closeButton = document.querySelector('.user-actions__close-menu-btn');
const categories = document.querySelectorAll('.categories-wrapper__category');

function showUserActions() {
    userActions.classList.add('active-user-actions');
}

function hideUserActions() {
    userActions.classList.remove('active-user-actions');
}

function toggleCategoryDeleteScreen(event) {
    
    let category = event.target;

    while(category.classList[0] != 'categories-wrapper__category') {
        console.log(category.classList[0]);
        category = category.parentNode;
    }

    category.querySelector('.category__screen2').classList.toggle('category__screen2-active');

}

hamburguerButton.addEventListener('click', showUserActions);
closeButton.addEventListener('click', hideUserActions);
categories.forEach(category => category.addEventListener(
    "click", (event) => toggleCategoryDeleteScreen(event)
));