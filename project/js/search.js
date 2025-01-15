document.addEventListener('DOMContentLoaded', () => {
    initializeSearch();
});

function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('recipe-results');
    const resultsCount = document.getElementById('results-count');

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchRecipes();
        }
    });
}

async function searchRecipes() {
    const searchQuery = document.getElementById('search-input').value;
    const maxReadyTime = document.getElementById('maxReadyTime').value;
    const cuisine = document.getElementById('cuisine').value;
    const diet = document.getElementById('diet').value;
    const intolerances = document.getElementById('intolerances').value;
    
    const resultsContainer = document.getElementById('recipe-results');
    const resultsCount = document.getElementById('results-count');
    
    resultsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
            <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3; 
                        border-top: 4px solid #6366f1; border-radius: 50%; animation: spin 1s linear infinite;">
            </div>
        </div>
    `;
    
    try {
        const params = {};
        
        if (searchQuery) params.query = searchQuery;
        if (maxReadyTime) params.maxReadyTime = maxReadyTime;
        if (cuisine) params.cuisine = cuisine;
        if (diet) params.diet = diet;
        if (intolerances) params.intolerances = intolerances;
        
        // Always include these required parameters
        params.apiKey = API_KEY;
        params.addRecipeInformation = true;
        params.number = 12;
        
        const recipes = await searchRecipesByFilters(params);
        
        if (recipes.length === 0) {
            resultsContainer.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                    <p style="color: #666;">No recipes found matching your criteria.</p>
                </div>
            `;
            resultsCount.textContent = 'No results found';
            return;
        }
        
        resultsCount.textContent = `Found ${recipes.length} recipes`;
        resultsContainer.innerHTML = '';
        
        recipes.forEach(recipe => {
            const card = createRecipeCard(recipe);
            resultsContainer.appendChild(card);
        });
        
    } catch (error) {
        resultsContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <p style="color: #ef4444;">Error loading recipes. Please try again.</p>
            </div>
        `;
        console.error('Search error:', error);
    }
}

function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    
    card.addEventListener('click', () => {
        window.location.href = `/pages/recipe-details.html?id=${recipe.id}`;
    });
    
    card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
        <div class="recipe-content">
            <h3 class="recipe-title">${recipe.title}</h3>
            <div class="recipe-meta">
                <span class="meta-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    ${recipe.readyInMinutes} mins
                </span>
                <span class="meta-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    ${recipe.servings} servings
                </span>
            </div>
        </div>
    `;
    
    return card;
}

const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);