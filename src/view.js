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

export function renderJoke(container, jokeData) {
    const [ category, id, joke, lastUpdate ] = jokeData;

    const jokeItem = document.createElement('div');
    jokeItem.classList.add('joke-item');

    const favoriteImg = document.createElement('img');
    favoriteImg.src = '../images/heart-default.svg';
    favoriteImg.alt = 'click to favorite';



    const jokeInfo = document.createElement('div');
    jokeInfo.classList.add('joke-info');

    const updateInfo = document.createElement('p');
    updateInfo.classList.add('update-info');
    updateInfo.innerText = `Last update: ${updateInfo} hours ago`

    const categoryInfo = document.createElement('p');
    categoryInfo.classList.add('category');
    categoryInfo.innerText = category;
}

function createJokeDiv(id, joke){
    const jokeDiv = document.createElement('div');
    const messageImg = document.createElement('img');
    const idP = document.createElement('p');
    const idA = document.createElement('a');
    const linkImg = document.createElement('img');
    const jokeText = document.createElement('p');

    jokeDiv.classList.add('joke');
    messageImg.classList.add('message');
    idP.classList.add('id');
    jokeText.classList.add('joke-text');

    idP.innerText = 'ID: ';
    idA.innerText = id;
    jokeText.innerText = joke;

    messageImg.src = '../images/message-main';
    messageImg.alt = 'message img';
    idA.href = `https://api.chucknorris.io/jokes/${id}`;
    linkImg.src = '../images/link.svg';
    linkImg.alt = 'link img';

    idA.append(linkImg);
    idP.append(idA);
    jokeDiv.append(messageImg, idP, idA, linkImg, jokeText);

    return jokeDiv;
}