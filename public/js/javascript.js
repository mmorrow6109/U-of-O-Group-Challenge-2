document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    const searchInput = document.getElementById('search-input').value;
    const apiKey = '671290bd9cc04d3398f3a6a089cfb049';
    const apiUrl = `https://api.spoonacular.com/recipes/search?query=${searchInput}&number=10&apiKey=${apiKey}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const recipeList = document.getElementById('recipe-list');
            recipeList.innerHTML = ''; // Clear previous content
            data.results.forEach(recipe => {
                const li = document.createElement('li');
                const link = document.createElement('a');
                link.textContent = recipe.title;
                link.href = recipe.sourceUrl;
                link.target = "_blank"; // Open link in a new tab
                li.appendChild(link);
                recipeList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
  });