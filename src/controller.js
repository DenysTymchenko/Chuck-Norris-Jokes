import { categories, getDataFromAPI, getDataForRender, getRandomItemFromArr } from "./model.js";
import { renderCategories, renderJoke } from "./view.js";

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

    renderCategories(categoriesContainer, categories)
});

optionSearch.addEventListener('click', () => {
    categoriesContainer.style.display = 'none';
    searchText.style.display = 'block';
});

getJokeBtn.addEventListener('click', async () => {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    const selectedOptionValue = selectedOption.value;

    switch (selectedOptionValue) {
        case 'random':
            const data = await getDataFromAPI('random');
            renderJoke(getDataForRender(data));
            break;
        case 'categories':
            try {
                const selectedCategory = document.querySelector('.selected');
                const categoryName = selectedCategory.innerHTML;
                const data = await getDataFromAPI(`random?category=${categoryName}`);
                renderJoke(getDataForRender(data));
            } catch (e){
                console.log(e);
            }

            break;
        case 'search':
            try{
                const queryText = searchText.value;
                const data = await getDataFromAPI(`search?query=${queryText}`);

                if (data.total === 0) {
                    throw new Error('There is no joke that matches this query');
                } else {
                    const renderData = getDataForRender(getRandomItemFromArr(data)); //API returns array with jokes, when user using search. That's why we're using getRandomItemFromArr().
                    renderJoke(renderData);
                }
            } catch (e) {
                console.log(e)
            }

            break;
    }
});