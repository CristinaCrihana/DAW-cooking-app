document.addEventListener('DOMContentLoaded', async () => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    if (!recipeId) {
        showError('Recipe not found');
        return;
    }

    try {
        const recipe = await getRecipeDetails(recipeId);
        displayRecipeDetails(recipe);
    } catch (error) {
        showError('Failed to load recipe details');
    }
});

function displayRecipeDetails(recipe) {
    const recipeDetailsContainer = document.getElementById('recipe-details');
    
    recipeDetailsContainer.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <img src="${recipe.image}" alt="${recipe.title}" 
                     class="w-full h-[400px] object-cover rounded-lg shadow-md">
            </div>
            <div>
                <h1 class="text-3xl font-bold text-dark mb-4">${recipe.title}</h1>
                
                <div class="flex flex-wrap gap-4 mb-6">
                    <div class="flex items-center text-gray-600">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>${recipe.readyInMinutes} minutes</span>
                    </div>
                    <div class="flex items-center text-gray-600">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        <span>${recipe.servings} servings</span>
                    </div>
                </div>

                <div class="mb-6">
                    <h2 class="text-xl font-semibold mb-2">Description</h2>
                    <p class="text-gray-600">${recipe.summary.replace(/<[^>]*>/g, '')}</p>
                </div>

                <div class="mb-6">
                    <h2 class="text-xl font-semibold mb-2">Dietary Info</h2>
                    <div class="flex flex-wrap gap-2">
                        ${recipe.vegetarian ? '<span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Vegetarian</span>' : ''}
                        ${recipe.vegan ? '<span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Vegan</span>' : ''}
                        ${recipe.glutenFree ? '<span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Gluten Free</span>' : ''}
                        ${recipe.dairyFree ? '<span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Dairy Free</span>' : ''}
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h2 class="text-2xl font-semibold mb-4">Ingredients</h2>
                <ul class="space-y-2">
                    ${recipe.extendedIngredients.map(ingredient => `
                        <li class="flex items-center text-gray-600">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            ${ingredient.original}
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div>
                <h2 class="text-2xl font-semibold mb-4">Instructions</h2>
                <ol class="space-y-4">
                    ${recipe.analyzedInstructions[0]?.steps.map(step => `
                        <li class="flex">
                            <span class="font-bold mr-2">${step.number}.</span>
                            <span class="text-gray-600">${step.step}</span>
                        </li>
                    `).join('') || 'No instructions available.'}
                </ol>
            </div>
        </div>
    `;
}

function showError(message) {
    const recipeDetailsContainer = document.getElementById('recipe-details');
    recipeDetailsContainer.innerHTML = `
        <div class="text-center py-8">
            <p class="text-red-500 text-xl">${message}</p>
            <a href="/" class="text-primary hover:text-primary/80 mt-4 inline-block">Return to Home</a>
        </div>
    `;
} 