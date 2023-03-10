import { categories, Joke , renderFavoriteJokes ,getDataFromAPI, parseDataForJoke, getRandomItemFromArr } from "./model.js";
import { renderCategories, showFavorite, closeFavorite } from "./view.js";

renderFavoriteJokes();

//options
const optionRandom = document.querySelector('#random');
const optionCategories = document.querySelector('#categories');
const optionSearch = document.querySelector('#search');

//detailed options
const categoriesContainer = document.querySelector('.categories-container');
const searchText = document.querySelector('#search_text');

//buttons
const openFavoriteBtn = document.querySelector('.main header .favorite');
const closeFavoriteBtn = document.querySelector('section.favorite header .favorite');
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

openFavoriteBtn.addEventListener('click', showFavorite);
closeFavoriteBtn.addEventListener('click', closeFavorite);

getJokeBtn.addEventListener('click', async () => {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    const selectedOptionValue = selectedOption.value;

    switch (selectedOptionValue) {
        case 'random':
            const data = await getDataFromAPI('random');
            const joke = new Joke(parseDataForJoke(data));
            joke.renderMain();
            break;
        case 'categories':
            try {
                const selectedCategory = document.querySelector('.selected');
                const categoryName = selectedCategory.innerHTML;
                const data = await getDataFromAPI(`random?category=${categoryName}`);
                const joke = new Joke(parseDataForJoke(data));
                joke.renderMain();
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
                    const jokeData = parseDataForJoke(getRandomItemFromArr(data)); //API returns array with jokes, when user using search. That's why we're using getRandomItemFromArr().
                    const joke = new Joke(jokeData);
                    joke.renderMain();
                }
            } catch (e) {
                console.log(e)
            }

            break;
    }
});