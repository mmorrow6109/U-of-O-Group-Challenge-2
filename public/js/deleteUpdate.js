document.querySelector("#update").addEventListener("click", evrnt => {
    event.preventDefault();
    const recipeId = document.querySelector("#hiddenRecipeId").value;
    const editRecipe = {
        title:document.querySelector("#editedTitle").value,
        content:document.querySelector("#editedContent").value,
    }
    console.log(recipeId)
    console.log(editRecipe)
    fetch((`/api/Recipe/${recipeId}`), {
        method:"PUT",
        body:JSON.stringify(editBlog),
        headers: {
            "Content-Type":"application/json"
        }
    }).then(res => {
        if(res.ok) {
            console.log("Recipe updated")
            location.href="/profile"
        } else {
            alert("Try again")
        }
    })
})

document.querySelector("#delete").addEventListener("click", event => {
    event.preventDefault()
    const recipeId = document.querySelector("#hiddenBlodId").value;
    fetch((`/api/blogs/${recipeId}`), {
        method:"DELETE",
    }).then(res => {
        if(res.ok) {
            console.log("Recipe deleted")
            location.href="/profile"
        } else {
            alert("Try again")
        }
    })
})