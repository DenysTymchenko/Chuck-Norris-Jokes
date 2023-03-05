const API = 'https://api.chucknorris.io/jokes/';
export const categories = await getDataFromAPI('categories');

export async function getDataFromAPI(path) {
    const response = await fetch(`${API}/${path}`);
    return await response.json();
}