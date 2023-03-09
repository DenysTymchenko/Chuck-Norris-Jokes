import { addToFavorite, removeFromFavorite } from "./controller.js";

export function renderCategories(container, categories) {
    categories.forEach(category => {
        const categoryP = document.createElement('p');
        categoryP.innerText = category;
        categoryP.classList.add('category');

        categoryP.addEventListener('click', () => {
            const previousSelectedCategory = document.querySelector('.selected');
            if (previousSelectedCategory !== null) previousSelectedCategory.classList.remove('selected');

            categoryP.classList.add('selected');
        });

        container.append(categoryP);
    })
}

export function renderJoke(jokeData, section) {
    const [ category, id, joke, lastUpdate ] = jokeData;

    const jokesContainer = document.querySelector(`${section} .jokes-container`);

    const jokeItem = document.createElement('div');
    jokeItem.classList.add('joke-item');

    const favoriteImg = document.createElement('img');
    favoriteImg.classList.add('favorite');
    if (section === '.main') {
        favoriteImg.src = '../images/heart-default.svg';
        favoriteImg.setAttribute('favorite', 'false')
    } else {
        favoriteImg.src = '../images/heart-favorite.svg';
        favoriteImg.setAttribute('favorite', 'true')
    }
    favoriteImg.alt = 'click to favorite';
    favoriteImg.addEventListener('click', () => favorite(favoriteImg, jokeData));

    const jokeDiv = createJokeDiv(id, joke, section);
    const JokeInfo = createJokeInfo(category, lastUpdate);

    jokeItem.append(favoriteImg, jokeDiv, JokeInfo);
    jokesContainer.append(jokeItem);
}

function createJokeDiv(id, joke, section) {
    const jokeDiv = document.createElement('div');
    jokeDiv.classList.add('joke');

    const messageImg = document.createElement('img');
    messageImg.classList.add('message');
    section === '.main' ? messageImg.src = '../images/message-main.png' : messageImg.src = '../images/message-favorite.png';
    messageImg.alt = 'message img';

    const idP = document.createElement('p');
    idP.classList.add('id');
    idP.innerText = 'ID: ';

    const idA = document.createElement('a');
    idA.href = `https://api.chucknorris.io/jokes/${id}`;
    idA.innerText = id;

    const linkImg = document.createElement('img');
    linkImg.src = '../images/link.svg';
    linkImg.alt = 'link img';

    const jokeText = document.createElement('p');
    jokeText.classList.add('joke-text');
    jokeText.innerText = joke;

    idA.append(linkImg);
    idP.append(idA);
    jokeDiv.append(messageImg, idP, jokeText);

    return jokeDiv;
}

function createJokeInfo(category, lastUpdate) {
    const jokeInfo = document.createElement('div');
    jokeInfo.classList.add('joke-info');

    const updateInfo = document.createElement('p');
    updateInfo.classList.add('update-info');
    updateInfo.innerText = `Last update: ${lastUpdate} hours ago`

    jokeInfo.append(updateInfo);

    if (category !== undefined) {
        const categoryInfo = document.createElement('p');
        categoryInfo.classList.add('category');
        categoryInfo.innerText = category;

        jokeInfo.append(categoryInfo);
    }

    return jokeInfo;
}

function favorite(favoriteImg, jokeData) {
    if (favoriteImg.getAttribute('favorite') === 'true') {
        removeFromFavorite(jokeData);
        favoriteImg.setAttribute('favorite', 'false');
        favoriteImg.src = '../images/heart-default.svg';
    } else {
        addToFavorite(jokeData);
        favoriteImg.setAttribute('favorite', 'true');
        favoriteImg.src = '../images/heart-favorite.svg';
    }
}