//options
const optionRandom = document.querySelector('#random');
const optionCategories = document.querySelector('#categories');
const optionSearch = document.querySelector('#search');

//detailed options
const categoriesContainer = document.querySelector('.categories-container');
const searchText =document.querySelector('#search_text');

optionCategories.addEventListener('click', () => {
    categoriesContainer.style.display = 'flex';
});

optionSearch.addEventListener('click', () => {
    searchText.style.display = 'block';
});

function hideDetailedOptions(){
    categoriesContainer.style.display = 'none';
    searchText.style.display = 'none';
}