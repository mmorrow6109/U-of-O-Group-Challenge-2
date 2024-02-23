document.querySelector("#signup").addEventListener("submit", event => {
    event.preventDefault();
    const userObj = {
        username:document.querySelector("#signupUsername").value,
        password:document.querySelector("#signupPassword").value,
    }
    console.log(userObj)
    fetch("/api/users/signup", {
        method:"POST",
        body:JSON.stringify(userObj),
        headers: {
            "Content-Type":"application/json"
        }
    }).then(res => {
        if(res.ok) {
            console.log("Signed up")
            location.href="/profile"
        } else {
            alert("Please try again")
        }
    })
})