document.addEventListener('DOMContentLoaded', async () => {
    const featuredRecipesContainer = document.getElementById('featured-recipes');
    

    const recipes = await getRandomRecipes(6);

    recipes.forEach(recipe => {
        const card = createRecipeCard(recipe);
        featuredRecipesContainer.appendChild(card);
    });
});

function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer';

    card.addEventListener('click', () => {
        window.location.href = `/pages/recipe-details.html?id=${recipe.id}`;
    });
    
    card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}" class="w-full h-48 object-cover">
        <div class="p-4">
            <h3 class="font-medium text-lg mb-2 text-dark">${recipe.title}</h3>
            <div class="flex items-center text-sm text-gray-600">
                <span class="mr-3">
                    <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    ${recipe.readyInMinutes} mins
                </span>
                <span>
                    <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    ${recipe.servings} servings
                </span>
            </div>
        </div>
    `;
    
    return card;
}
