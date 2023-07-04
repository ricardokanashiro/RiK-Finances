import { chartPallete } from "./utils.js";
import { myBarChart, myPieChart } from "./utils.js";

const userActions = document.querySelector('.header__user-actions');
const hamburguerButton = document.querySelector('.header__hamburger-btn');

const closeButton = document.querySelector('.user-actions__close-menu-btn');

const categories = document.querySelectorAll('.categories-wrapper__category');

const categoriesModal = document.querySelector('.modal__categories__wrapper');
const actionsModal = document.querySelector('.modal__actions__wrapper');

const buttons = document.querySelectorAll('button');

buttons.forEach(btn => btn.addEventListener('click', (event) => {
    event.preventDefault();
}));

function showUserActions() {
    userActions.classList.add('active-user-actions');
}

function hideUserActions() {
    userActions.classList.remove('active-user-actions');
}

function toggleCategoryDeleteScreen(event) {

    if(!event.target.classList.contains('delete-icon')) {
        let category = event.target;

        while(category.classList[0] != 'categories-wrapper__category') {
            console.log(category.classList[0]);
            category = category.parentNode;
        }

        category.querySelector('.category__screen2').classList.toggle('category__screen2-active');
    }

}

function showModal(modal) {
    modal.classList.toggle('activedModal');
}

function toggleModalActionBtn(event) {
    let previousActivedButton = actionsModal.querySelector('.activedActionBtn');

    if(previousActivedButton) { 
        previousActivedButton.classList.remove('actived');
    }

    if(event.target.classList.contains('choose-action__input')) {
        event.target.classList.add('activedActionInputBtn');
    } else {
        event.target.classList.add('activedActionOutputBtn');
    }
}

hamburguerButton.addEventListener('click', showUserActions);
closeButton.addEventListener('click', hideUserActions);
categories.forEach(category => category.addEventListener(
    "click", (event) => toggleCategoryDeleteScreen(event)
));