const API_KEY = '67050f3767fe43519c62411f8a055f69';
        const BASE_URL = 'https://api.spoonacular.com/recipes';

        document.getElementById('generateButton').addEventListener('click', generateRandomRecipe);

        async function generateRandomRecipe() {
            const recipeContainer = document.getElementById('recipeContainer');
            
            // Show loading state
            recipeContainer.innerHTML = `
                <div class="loading">
                    <div class="loading-spinner"></div>
                    <p>Finding a delicious recipe for you...</p>
                </div>
            `;

            try {
                const response = await fetch(`${BASE_URL}/random?apiKey=${API_KEY}&number=1`);
                const data = await response.json();
                const recipe = data.recipes[0];

                // Create recipe card HTML
                const recipeCard = `
                    <div class="recipe-card">
                        <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
                        <h2 class="recipe-title">${recipe.title}</h2>
                        
                        <div class="recipe-meta">
                            <div class="recipe-meta-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                Ready in ${recipe.readyInMinutes} minutes
                            </div>
                            <div class="recipe-meta-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                                Serves ${recipe.servings} people
                            </div>
                        </div>

                        <h3 class="ingredients-title">Ingredients</h3>
                        <ul class="ingredients-list">
                            ${recipe.extendedIngredients.map(ingredient => 
                                `<li>${ingredient.original}</li>`
                            ).join('')}
                        </ul>

                        <h3 class="ingredients-title">Instructions</h3>
                        <div class="instructions">
                            ${recipe.instructions || "No instructions available for this recipe."}
                        </div>
                    </div>
                `;

                recipeContainer.innerHTML = recipeCard;

                // Add visible class after a small delay for animation
                setTimeout(() => {
                    document.querySelector('.recipe-card').classList.add('visible');
                }, 100);

            } catch (error) {
                recipeContainer.innerHTML = `
                    <div class="recipe-card">
                        <p style="color: #ef4444; text-align: center;">
                            Oops! Something went wrong. Please try again.
                        </p>
                    </div>
                `;
                console.error('Error fetching random recipe:', error);
            }
        }