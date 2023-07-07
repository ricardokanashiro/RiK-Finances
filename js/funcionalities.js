const contentWrapper = document.querySelector('#content-wrapper');

const categoriesWrapper = document.querySelector('.main__categories-wrapper');

const categoryModal = document.querySelector('.modal__categories__wrapper .modal');
const categoryNameInput = categoryModal.querySelector('#categoryName');
const categoryValueInput = categoryModal.querySelector('#categoryValue');
const categoryAddCategoryBtn = categoryModal.querySelector('button');

const actionsModal = document.querySelector('.modal__actions__wrapper .modal');

let deleteCategoryBtn = document.querySelectorAll('.delete-icon');

let categories = [];

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
    let storagedCategories = localStorage.getItem('categories');

    if(storagedCategories && categories.length === 0) {
        categories.push(...JSON.parse(storagedCategories));
    }

    categoriesWrapper.innerHTML = '';

    categories.forEach(category => {
        categoriesWrapper.innerHTML += `
            <div class="categories-wrapper__category">

                <div class="category__screen1">
                    <h3>${category.name}</h3>

                    <p>R$ ${category.value}</p>
                </div>

                <div class="category__screen2">
                    <span class="material-symbols-outlined delete-icon">delete</span>
                </div>

                <div class="category__arrow">
                    <span class="material-symbols-outlined arrow-icon">pan_tool_alt</span>
                </div>

            </div>
        `;
    });

    let categoriesComponent = document.querySelectorAll('.categories-wrapper__category');

    categoriesComponent.forEach(category => category.addEventListener(
        "click", (event) => toggleCategoryDeleteScreen(event)
    ));

    deleteCategoryBtn = document.querySelectorAll('.delete-icon');

    deleteCategoryBtn.forEach(btn => btn.addEventListener(
        'click', (event) => deleteCategory(event)
    ));
}

function createCategory() {

    if(!categoryNameInput.value && !categoryValueInput.value) {
        alert('Por favor, adicione o valor e/ou nome da categoria!');
    }
    else {
        let storagedCategories = localStorage.getItem('categories');

        if(storagedCategories && categories.length === 0) {
            categories.push(...JSON.parse(storagedCategories));
        }

        categories.push(
            {
                name: categoryNameInput.value,
                value: categoryValueInput.value
            }
        );

        localStorage.setItem('categories', JSON.stringify(categories));

        updateApp();

        categoryModal.parentNode.classList.remove('activedModal');
        contentWrapper.classList.remove('locked');
    } 
}

function deleteCategory(event) {
    let eventCategory = event.target.parentNode.parentNode;

    eventCategory = categories.find(
        category => category.name === eventCategory.querySelector('h3').innerText
    );

    console.log('oi')

    console.log(categories);
    console.log(eventCategory);

    categories.splice(categories.indexOf(eventCategory), 1);

    localStorage.setItem('categories', JSON.stringify(categories));

    updateApp();
}

// localStorage.clear();

categoryAddCategoryBtn.addEventListener('click', createCategory);