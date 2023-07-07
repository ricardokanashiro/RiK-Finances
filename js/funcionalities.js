const categoriesWrapper = document.querySelector('.main__categories-wrapper');

const categoryModal = document.querySelector('.modal__categories__wrapper .modal');
const categoryNameInput = categoryModal.querySelector('#categoryName');
const categoryValueInput = categoryModal.querySelector('#categoryValue');
const categoryAddCategoryBtn = categoryModal.querySelector('button');

const actionsModal = document.querySelector('.modal__actions__wrapper .modal');

let categories = [];

function updateApp() {
    let storagedCategories = localStorage.getItem('categories');

    if(storagedCategories && categories.length === 0) {
        categories.push(...JSON.parse(storagedCategories));
    }

    console.log(categories);

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
}

function createCategory() {

    if(!categoryNameInput && !categoryValueInput) {
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
    } 
}

localStorage.clear();

categoryAddCategoryBtn.addEventListener('click', createCategory);