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