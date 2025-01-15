const API_KEY = '3f20e48be72b45419b7bd43ff2102d22';
const BASE_URL = 'https://api.spoonacular.com/recipes';

async function getRandomRecipes(number = 6) {
    try {
        const response = await fetch(`${BASE_URL}/random?apiKey=${API_KEY}&number=${number}`);
        const data = await response.json();
        return data.recipes;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }
} 
async function getRecipeDetails(id) {
    try {
        const response = await fetch(
            `${BASE_URL}/${id}/information?apiKey=${API_KEY}`
        );
        if (!response.ok) {
            throw new Error('Recipe not found');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        throw error;
    }
}

async function searchRecipesByFilters(params) {
    const queryParams = new URLSearchParams({
        apiKey: API_KEY,
        ...params
    });
    
    try {
        const response = await fetch(`${BASE_URL}/complexSearch?${queryParams}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error searching recipes:', error);
        throw error;
    }
}