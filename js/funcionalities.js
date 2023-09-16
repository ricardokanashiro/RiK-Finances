import chartPallete from "./chartConfig.js";
import { 
    getMonthName,
    formatCurrency, 
    verifyMoreThanThreeDC,
    verifyTransactionAction 
} from "./utils.js";

import { 
    myBarChart,
    myPieChart,
    buildPieChartData,
    buildBarChartData
} from "./chartConfig.js"; 

const contentWrapper = document.querySelector('#content-wrapper');

const userActions = document.querySelector('.header__user-actions');

const categoriesWrapper = document.querySelector('.main__categories-wrapper');

const categoryModal = document.querySelector('.modal__categories__wrapper .modal');
const categoryNameInput = categoryModal.querySelector('#categoryName');
const categoryNameCharMax = categoryModal.querySelector('.categoryNameCharMax');
const categoryValueInput = categoryModal.querySelector('#categoryValue');
const categoryAddCategoryBtn = categoryModal.querySelector('button');
const mobileMenu = document.querySelector('.header__user-actions');

const actionsModal = document.querySelector('.modal__actions__wrapper .modal');
const actionValueInput = actionsModal.querySelector('input');
const inputActionBtn = actionsModal.querySelector('.choose-action__input');
const outputActionBtn = actionsModal.querySelector('.choose-action__output');
const addActionBtn = actionsModal.querySelector('.addActionBtn');

const deleteCategoryModal = document.querySelector('.modal__delete-category');
const deleteCategoryModalBtn = document.querySelector('.modal__delete-category button');

const withdrawModal = document.querySelector('.modal__withdraw__wrapper');
const withdrawModalBtn = document.querySelector('.modal__withdraw__wrapper button');
const withdrawModalInput = document.querySelector('.modal__withdraw__wrapper input');

const amountValue = document.querySelector('.amount__value');
const lastTransaction = document.querySelector('.last-transaction__value');

let deleteCategoryBtn = document.querySelectorAll('.delete-icon__wrapper');
let withdrawBtns = document.querySelectorAll('.money-icon__wrapper');

let categoryEvent;

let categoryColorIndex;

let categories = [];

let othersCategory = {
    name: 'Outros',
    percentage: 100, 
};

let transactions = [];

let totalBalance = {
    total: 0,
    lastTransaction: 'R$0,00',
    withdraw: 0,
}

let currentMonth;

let selectedAction;

updateApp();

function toggleCategoryDeleteScreen(event) {

    if(!event.target.classList.contains('delete-icon')) {
        let category = event.target;

        while(category.classList[0] != 'categories-wrapper__category') {
            category = category.parentNode;
        }

        category.querySelector('.category__screen2').classList.toggle('category__screen2-active');
    }

}

function updateApp() {
    // Dependências de Balanço Total:

    if(localStorage.getItem('total')) {
        totalBalance = JSON.parse(localStorage.getItem('total'));
    }

    lastTransaction.innerText = totalBalance.lastTransaction;
    amountValue.innerText = formatCurrency(totalBalance.total - totalBalance.withdraw);

    verifyTransactionAction(totalBalance.lastTransaction, lastTransaction);

    // Dependências de Ações:

    let storedTransactions = localStorage.getItem('transactions');

    if(storedTransactions) {
        transactions = JSON.parse(storedTransactions);
    }

    currentMonth = getMonthName(new Date().getMonth());

    if(transactions.length > 4) {
        transactions.shift();
    }

    // Dependências de Categorias:

    let storagedCategories = localStorage.getItem('categories');

    if(storagedCategories && categories.length === 0) {
        categories.push(...JSON.parse(storagedCategories));
    }

    let storagedOthersCategory = localStorage.getItem('othersCategory');

    if(storagedOthersCategory) {
        othersCategory = JSON.parse(storagedOthersCategory);
    }

    categoriesWrapper.innerHTML = '';

    categoryColorIndex = 0;

    categories.forEach(category => 
        {
            category.color = chartPallete.chartPallete[categoryColorIndex]
            categoryColorIndex++
        }
    );

    categories.forEach(category => 
        {
            category.total = (totalBalance.total * category.percentage) / 100;
        }
    );

    categories.forEach(category => {
        categoriesWrapper.innerHTML += `
            <div class="categories-wrapper__category">

                <div class="category__screen1">
                    <div class="category__name-wrapper">
                        <h3>${category.name}</h3>
                    </div>

                    <div class="category__value-wrapper">
                        <p>R$ 
                            ${
                                category.withdraw ? category.total - category.withdraw :
                                category.total
                            }
                        </p>
                    </div>

                    <div class="category__percentage-wrapper">
                        <p>${category.percentage}%</p>
                    </div>

                    <div 
                        class="category__color-wrapper"
                        style="background-color: ${category.color}"
                    >
                    
                    </div>
                </div>

                <div class="category__screen2">

                    <button class="delete-icon__wrapper">
                        <span class="material-symbols-outlined delete-icon">delete</span>
                    </button>


                    <button class="money-icon__wrapper">
                        <span class="material-symbols-outlined money-icon">attach_money</span>
                    </button>

                </div>

                <div class="category__arrow">
                    <span class="material-symbols-outlined arrow-icon">pan_tool_alt</span>
                </div>

            </div>
        `;
    });

    if(othersCategory.percentage !== 0) {
        categoriesWrapper.innerHTML += `
                <div class="categories-wrapper__category" style="cursor: default">
    
                    <div class="category__screen1">
                        <div class="category__name-wrapper">
                            <h3>${othersCategory.name}</h3>
                        </div>
    
                        <div class="category__value-wrapper">
                            <p>R$ 
                                ${
                                    totalBalance.total * Number(othersCategory.percentage) / 100
                                }
                            </p>
                        </div>
    
                        <div class="category__percentage-wrapper">
                            <p>${othersCategory.percentage}%</p>
                        </div>
    
                        <div 
                            class="category__color-wrapper"
                            // style="background-color: gray"
                        >
                        </div>
                    </div>
    
                    
    
                </div>
        `;
    }

    let categoriesComponent = document.querySelectorAll('.categories-wrapper__category');

    categoriesComponent.forEach(category => category.addEventListener(
        "click", (event) => toggleCategoryDeleteScreen(event)
    ));

    deleteCategoryBtn = document.querySelectorAll('.delete-icon__wrapper');

    deleteCategoryBtn.forEach(btn => btn.addEventListener(
        'click', (event) => showDeleteCategoryModal(event)
    ));

    withdrawBtns = document.querySelectorAll('.money-icon__wrapper');

    withdrawBtns.forEach(btn => btn.addEventListener(
        'click', (event) => showWithdrawModal(event)
    ));

    // Dependências e Ações dos Gráficos

    buildPieChartData(categories, 'name', othersCategory, myPieChart);
    buildPieChartData(categories, 'percentage', othersCategory, myPieChart);
    buildPieChartData(categories, 'color', othersCategory, myPieChart);

    buildBarChartData(transactions, 'month', myBarChart);
    buildBarChartData(transactions, 'data', myBarChart);
}

function limitInputCharacters(event) {
    if(event.target.value.length >= 40) {
        event.target.value = event.target.value.substring(
            0, 40
        );
    }

    categoryNameCharMax.innerText = `${event.target.value.length}/40`;
}

function createCategory() {

    if(!categoryNameInput.value || !categoryValueInput.value) {
        alert('Por favor, adicione o valor e/ou nome da categoria!');
    }
    else if(categoryValueInput.value > othersCategory.percentage) {
        alert('Você excedeu o total da porcentagem disponível!');
    }
    else {
        if(Number(categoryValueInput.value) <= 0) {
            return alert('Valor Inválido!');
        }

        othersCategory.percentage -= Number(categoryValueInput.value);

        localStorage.setItem('othersCategory', JSON.stringify(othersCategory));

        if(categories.length < 10) {
            categories.push(
                {
                    name: categoryNameInput.value,
                    percentage: categoryValueInput.value,
                }
            );
    
            localStorage.setItem('categories', JSON.stringify(categories));
    
            updateApp();
    
            categoryModal.parentNode.classList.remove('activedModal');
            contentWrapper.classList.remove('locked');
    
            mobileMenu.classList.remove('active-user-actions');
    
            categoryNameInput.value = "";
            categoryValueInput.value = "";
        }
        else {
            alert('O número máximo de categorias foi excedido! O total são 8 categorias!');
        }
    } 

    userActions.classList.remove('active-user-actions');
    contentWrapper.classList.remove('locked');
}

function showDeleteCategoryModal(event) {
    contentWrapper.classList.add('locked');
    deleteCategoryModal.classList.add('activedModal');

    categoryEvent = event;
}

function deleteCategory() {

    let eventCategory = categoryEvent.target.parentNode.parentNode;

    while(!eventCategory.classList.contains('categories-wrapper__category')) {
        eventCategory = eventCategory.parentNode;
    }

    eventCategory = categories.find(
        category => category.name === eventCategory.querySelector('h3').innerText
    );

    othersCategory.percentage += Number(eventCategory.percentage);

    localStorage.setItem('othersCategory', JSON.stringify(othersCategory));

    categories.splice(categories.indexOf(eventCategory), 1);

    localStorage.setItem('categories', JSON.stringify(categories));

    updateApp();

    contentWrapper.classList.remove('locked');
    deleteCategoryModal.classList.remove('activedModal');
}

function withdrawCategory() {

    let eventCategory = categoryEvent.target.parentNode.parentNode;

    while(!eventCategory.classList.contains('categories-wrapper__category')) {
        eventCategory = eventCategory.parentNode;
    }

    eventCategory = categories.find(
        category => category.name === eventCategory.querySelector('h3').innerText
    );

    if(eventCategory.total < Number(withdrawModalInput.value)) {
        return alert('O valor de retirada selecionado é maior que o valor da categoria!');
    }

    if(!eventCategory.withdraw) {
        eventCategory.withdraw = Number(withdrawModalInput.value);
    } else {
        eventCategory.withdraw += Number(withdrawModalInput.value);
    }

    totalBalance.withdraw += Number(withdrawModalInput.value);

    localStorage.setItem('total', JSON.stringify(totalBalance));

    contentWrapper.classList.remove('locked');
    withdrawModal.classList.remove('activedModal');

    localStorage.setItem('categories', JSON.stringify(categories));

    updateApp();
}

function storeTransaction() {
    if(
        verifyMoreThanThreeDC(actionValueInput.value) ||
        !actionValueInput.value ||
        !(inputActionBtn.classList.contains('activedActionInputBtn') ||
        outputActionBtn.classList.contains('activedActionOutputBtn'))
    ) {
        return alert('O valor é inválido!');
    }

    // let storedTransactions = localStorage.getItem('transactions');

    // if(storedTransactions) {
    //     transactions = JSON.parse(storedTransactions);
    // }

    let selectedMonth = transactions.find(item => item.month === currentMonth);

    if(inputActionBtn.classList.contains('activedActionInputBtn')) {
        selectedAction = 'input';
        inputActionBtn.classList.remove('activedActionInputBtn');

        lastTransaction.innerText = '+ ' + formatCurrency(actionValueInput.value);
        totalBalance.lastTransaction = '+ ' + formatCurrency(actionValueInput.value);
    }
    else if(outputActionBtn.classList.contains('activedActionOutputBtn')) {
        selectedAction = 'output';
        outputActionBtn.classList.remove('activedActionOutputBtn');

        lastTransaction.innerText = '- ' + formatCurrency(actionValueInput.value);
        totalBalance.lastTransaction = '- ' + formatCurrency(actionValueInput.value);
    }

    verifyTransactionAction(totalBalance.lastTransaction, lastTransaction);

    if(selectedAction && actionValueInput.value) {
        if(!selectedMonth) {
            transactions.push(
                {
                    month: currentMonth,
                    monthTransactions: [
                        {
                            action: selectedAction,
                            value: Number(actionValueInput.value),
                        },
                    ],
                }
            );
        }
        else {
            selectedMonth.monthTransactions.push(
                {
                    action: selectedAction,
                    value: Number(actionValueInput.value),
                }
            );
        }
    }

    actionValueInput.value = '';
    actionsModal.parentNode.classList.remove('activedModal');
    contentWrapper.classList.remove('locked');

    selectedAction = null;

    localStorage.setItem('transactions', JSON.stringify(transactions));

    calcAmountValue();

    updateApp();

    userActions.classList.remove('active-user-actions');
    contentWrapper.classList.remove('locked');
}

function calcAmountValue() {

    totalBalance.total = 0;

    transactions.forEach(month => 
        month.monthTransactions.forEach((transaction) => {
            if(transaction.action === 'input') {
                totalBalance.total += transaction.value;
            }
            else if(transaction.action === 'output') {
                totalBalance.total -= transaction.value;
            } 
        })
    );

    amountValue.innerText = formatCurrency(totalBalance.total - totalBalance.withdraw);

    localStorage.setItem('total', JSON.stringify(totalBalance));
}

// localStorage.clear();

function showWithdrawModal(event) {
    contentWrapper.classList.add('locked');
    withdrawModal.classList.add('activedModal');

    categoryEvent = event;
}

function registerWithEnter(event) {
    let activedModal = document.querySelector('.activedModal');

    if(event.key === 'Enter' && activedModal) {

        if(activedModal.classList.contains('modal__categories__wrapper')) {
            createCategory()
        }
        else if(activedModal.classList.contains('modal__actions__wrapper')) {
            storeTransaction()
        }
        else if(activedModal.classList.contains('modal__withdraw__wrapper')) {
            withdrawCategory()
        }
        else if(activedModal.classList.contains('modal__delete-category')) {
            deleteCategory()
        }

    }
}

categoryAddCategoryBtn.addEventListener('click', createCategory);

addActionBtn.addEventListener('click', storeTransaction);

deleteCategoryModalBtn.addEventListener('click', deleteCategory);

categoryNameInput.addEventListener('keydown', (event) => limitInputCharacters(event));categoryNameInput.addEventListener('keyup', (event) => limitInputCharacters(event));

document.addEventListener('keydown', (event) => registerWithEnter(event));

withdrawModalBtn.addEventListener('click', withdrawCategory);