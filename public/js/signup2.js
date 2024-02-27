
async function signupFormHandler(event) {
    event.preventDefault();
  
    // Select the inputs, get its value, and trim any whitespace
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

  
    // Check if the username, email, and password inputs exist
    if (username && email && password) {
      // Make a POST request to the users API endpoint
      const response = await fetch('/api/users', {
        method: 'POST', // Specify the request method
        body: JSON.stringify({
          username, // Include these inputs in the request body
          email, 
          password 
        }),
        headers: {
          'Content-Type': 'application/json' 
        }
      });
  
      if (response.ok) {
        // Log 'success' to the console
        console.log('success');
        // Redirect the user to the home page
        document.location.replace('/home');
      } else {
        // Otherwise, alert the user with the status text of the response
        alert(response.statusText);
      }
    }
  }
  
  document.querySelector('#signup').addEventListener('submit', signupFormHandler);