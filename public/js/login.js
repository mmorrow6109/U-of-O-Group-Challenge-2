document.querySelector("#login").addEventListener("submit", event => {
    event.preventDefault()
    const userObj = {
        username: document.querySelector("#username").value,
        password: document.querySelector("#password").value,
    }
    
    console.log(userObj)
    fetch("/api/users/login", {
        method:"POST",
        body:JSON.stringify(userObj),
        headers: {
            "Content-Type":"application/json"
        }
    }).then(res => {
        if(res.ok) {
            console.log("Logged in")
            location.href="/profile"
        } else {
            alert("Please try again")
        }
    })
})