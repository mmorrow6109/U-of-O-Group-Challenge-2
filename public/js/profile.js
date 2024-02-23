var existingRecipes = document.querySelector("#existingrecipes")
var createNew = document.querySelector("#createNew")
var newPost = document.querySelector("#newpost")
var newRecipe = document.querySelector("#newRecipe")

function hideCreateNew() {
    createNew.hidden = true;
}

hideCreateNew();

newPost.addEventListener("submit", event => {
    event.preventDefault()
    console.log('click')
    existingRecipes.hidden = true;
    newPost.hidden = true;
    createNew.hidden = false;
});

newRecipe.addEventListener("submit", event => {
    var title = document.querySelector("#title").value;
    var content = document.querySelector("#content").value
    event.preventDefault()
    console.log("click")
    if (!title || !content) {
        alert("Entert title and content")
        return;
    }
    const recipeObj = {
        title: title,
        content: content,
    }
    fetch("/api/recipes", {
        method:"POST",
        body:JSON.stringify(recipeObj),
        headers: {
            "Content-Type":"application/json"
        }
    }).then(res => {
        if(res.ok) {
            createNew.setAttribute("hidden", "false")
            location.reload()
        } else {
            alert("Try Again")
        }
    })
})