import { getDataFromAPI } from "./model.js";

//options
const optionRandom = document.querySelector('#random');
const optionCategories = document.querySelector('#categories');
const optionSearch = document.querySelector('#search');

//detailed options
const categoriesContainer = document.querySelector('.categories-container');
const searchText = document.querySelector('#search_text');

const getJokeBtn = document.querySelector('.get-joke-btn');

optionRandom.addEventListener('click', () => {
    categoriesContainer.style.display = 'none';
    searchText.style.display = 'none';
});

optionCategories.addEventListener('click', () => {
    categoriesContainer.style.display = 'flex';
    searchText.style.display = 'none';
});

optionSearch.addEventListener('click', () => {
    categoriesContainer.style.display = 'none';
    searchText.style.display = 'block';
});

getJokeBtn.addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    const selectedOptionValue = selectedOption.value;

    switch (selectedOptionValue) {
        case 'random':
            //...
            break;
        case 'categories':
            //...
            break;
        case 'search':
            //...
            break;
    }

    getDataFromAPI(selectedOptionValue);
});