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

export function renderJoke(joke, section) {
    const jokesContainer = document.querySelector(`${section} .jokes-container`);

    const jokeItem = document.createElement('div');
    jokeItem.classList.add('joke-item');
    jokeItem.classList.add(`joke-item_${joke.getId}`);

    const favoriteImg = document.createElement('img');
    favoriteImg.classList.add('favorite');
    if (joke.getFavorite) {
        favoriteImg.src = '../images/heart-favorite.svg';
        favoriteImg.setAttribute('favorite', 'true');
    } else {
        favoriteImg.src = '../images/heart-default.svg';
        favoriteImg.setAttribute('favorite', 'false');
    }
    favoriteImg.alt = 'click to favorite';
    favoriteImg.addEventListener('click', () => favorite(joke));

    const jokeDiv = createJokeDiv(joke.getId, joke.getJoke, section);
    const JokeInfo = createJokeInfo(joke.getCategory, joke.getLastUpdate);

    jokeItem.append(favoriteImg, jokeDiv, JokeInfo);
    joke.setJokeItem = jokeItem;
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

function favorite(joke) {
    const favoriteImgMain = document.querySelector(`.main .joke-item_${joke.getId} img.favorite`);
    console.log(favoriteImgMain);

    if (joke.getFavorite) {
        joke.removeFromFavorite();
        favoriteImgMain.setAttribute('favorite', 'false');
        favoriteImgMain.src = '../images/heart-default.svg';
    } else {
        joke.addToFavorite();
        favoriteImgMain.setAttribute('favorite', 'true');
        favoriteImgMain.src = '../images/heart-favorite.svg';
    }
}