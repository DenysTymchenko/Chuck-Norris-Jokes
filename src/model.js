import { renderJoke } from "./view.js";

const API = 'https://api.chucknorris.io/jokes/';
export const categories = await getDataFromAPI('categories');
export const favoriteJokes = [];

export async function getDataFromAPI(path) {
    const response = await fetch(`${API}/${path}`);
    const data = await response.json();

    return data;
}

export function parseDataForJoke(data) {
    const { categories: [ category ] ,id, value, updated_at } = data;
    return [category, id, value, getTimeAfterLastUpdate(updated_at)];
}

function getTimeAfterLastUpdate(lastUpdate) {
    const year = +lastUpdate.slice(0,4);
    const month = +lastUpdate.slice(5,7);
    const day = +lastUpdate.slice(8,10);
    const hour = +lastUpdate.slice(11,13);

    const lastUpdateDate = new Date(Date.UTC(year, month - 1, day, hour));
    const currentDate = new Date();

    const millisecondsDifference  = currentDate.getTime() - lastUpdateDate.getTime();
    const hoursDifference = Math.floor(millisecondsDifference / 3600000) //3600000 - amount of milliseconds in 1 hour

    return hoursDifference;
}

export function getRandomItemFromArr(arr) {
    const getRandomInt = max => Math.floor(Math.random() * max);
    return arr.result[getRandomInt(arr.total)];
}

export class Joke {
    constructor(data) {
        const [ category, id, joke, lastUpdate ] = data;

        this.category = category;
        this.id = id;
        this.joke = joke;
        this.lastUpdate = lastUpdate;
        this.favorite = false;
    }

    get getCategory() {
        return this.category;
    }

    get getId() {
        return this.id;
    }

    get getJoke() {
        return this.joke;
    }

    get getLastUpdate() {
        return this.lastUpdate;
    }

    get getFavorite() {
        return this.favorite
    }

    set setJokeItem(jokeItem) {
        this.jokeItem = jokeItem;
    }

    addToFavorite() {
        this.favorite = true;
        favoriteJokes.unshift(this);
        localStorage.setItem('favorite', JSON.stringify(favoriteJokes));

        this.renderFavorite();
    }

    removeFromFavorite() {
        this.favorite = false;

        const jokeIndex = favoriteJokes.indexOf(this);
        favoriteJokes.splice(jokeIndex, 1);
        localStorage.setItem('favorite', JSON.stringify(favoriteJokes));

        this.jokeItem.remove();
    }

    renderMain() {
        renderJoke(this, '.main');
    }

    renderFavorite(){
        renderJoke(this, '.favorite');
    }
}