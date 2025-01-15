# Recipe App

A responsive web application for discovering and exploring recipes. Users can search for recipes, apply filters, view recipe details, and get random recipe suggestions.

## Deployment

To open the GitHub Pages deployment, go to this link: [Recipe App Deployment](https://cristinacrihana.github.io/DAW-cooking-app/project/index.html)

---

## Technologies Used

### Frontend
- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **Tailwind CSS** (for styling)
- **Google Fonts** (Poppins)

### APIs
- **Spoonacular API** (for recipe data)

### Development Tools
- **URL Search Params API**
- **Fetch API**
- **CSS Grid**
- **CSS Flexbox**
- **CSS Custom Properties (Variables)**
- **CSS Animations** (@keyframes)

---

## Features

- **Recipe Search with Multiple Filters**:
  - Cooking time
  - Cuisine type
  - Dietary restrictions
  - Food intolerances
- **Random Recipe Generator**
- **Detailed Recipe View**
- **Responsive Design**
- **Loading States and Error Handling**

---

## Prerequisites

To run this project locally, make sure you have the following installed:

1. **Node.js** and **npm** (for dependency management and development tools)
2. **Visual Studio Code (VSC)**

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cristinacrihana/DAW-cooking-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd DAW-cooking-app/project
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Install Tailwind CSS:
   ```bash
   npx tailwindcss init
   ```

   Configure Tailwind by updating the `tailwind.config.js` file and including Tailwind directives in your CSS files:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

5. If the Spoonacular API key is not working, create a new Spoonacular account and generate a new API key. Update the `api.js` file with the new key.



---

## Usage

1. **Search Recipes**:
   - Use the search bar to find recipes.
   - Apply filters for cooking time, cuisine type, dietary restrictions, and food intolerances.

2. **Random Recipe Generator**:
   - Click the random recipe button to explore new dishes.

3. **View Recipe Details**:
   - Click on a recipe to view its details, including ingredients and instructions.

4. **Responsive Design**:
   - The app works seamlessly on desktop, tablet, and mobile devices.

---
