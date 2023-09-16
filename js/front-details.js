const contentWrapper = document.querySelector('#content-wrapper');

const userActions = document.querySelector('.header__user-actions');
const hamburguerButton = document.querySelector('.header__hamburger-btn');

const closeButton = document.querySelector('.user-actions__close-menu-btn');

const categoriesModal = document.querySelector('.modal__categories__wrapper');
const categoryNameCharMax = categoriesModal.querySelector('.categoryNameCharMax');
const actionsModal = document.querySelector('.modal__actions__wrapper');
const actionsBtns = document.querySelectorAll('.choose-action__btn');
const closeModalBtns = document.querySelectorAll('.closeModal');
const headerBtns = document.querySelectorAll('.header__btn');

function showUserActions() {
    userActions.classList.add('active-user-actions');
    contentWrapper.classList.add('locked');
}

function hideUserActions() {
    userActions.classList.remove('active-user-actions');
    contentWrapper.classList.remove('locked');
}

function showModal(event) {
    contentWrapper.classList.add('locked');

    if(event.target.classList.contains('header__category-btn')) {
        categoriesModal.classList.add('activedModal');
        categoryNameCharMax.innerText = '0/40';
    } 
    else if(event.target.classList.contains('header__actions-btn')) {
        actionsModal.classList.add('activedModal');
    }
}

function hideModal(event) {
    contentWrapper.classList.remove('locked');

    event.target.parentNode.parentNode.classList.remove('activedModal');

    let modalInputs = event.target.parentNode.querySelectorAll('input');
    modalInputs.forEach(input => input.value = '');
}

function toggleModalActionBtn(event) {
    event.preventDefault();

    let previousActivedInputButton = actionsModal.querySelector('.activedActionInputBtn');
    let previousActivedOutputButton = actionsModal.querySelector('.activedActionOutputBtn');

    if(previousActivedInputButton) { 
        previousActivedInputButton.classList.remove('activedActionInputBtn');
    } 
    else if(previousActivedOutputButton) {
        previousActivedOutputButton.classList.remove('activedActionOutputBtn');
    }

    if(event.target.classList.contains('choose-action__input')) {
        event.target.classList.add('activedActionInputBtn');
    } else {
        event.target.classList.add('activedActionOutputBtn');
    }
}

hamburguerButton.addEventListener('click', showUserActions);

closeButton.addEventListener('click', hideUserActions);

actionsBtns.forEach(btn => btn.addEventListener(
    'click', (event) => toggleModalActionBtn(event)
));

closeModalBtns.forEach(btn => btn.addEventListener(
    'click', (event) => hideModal(event)
));

headerBtns.forEach(btn => btn.addEventListener(
    'click', (event) => showModal(event)
));