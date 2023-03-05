const API = 'https://api.chucknorris.io/jokes/';

export async function getDataFromAPI(path) {
    const response = await fetch(`${API} + ${path}`);
    return await response.json();
}