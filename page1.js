function validateForm(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way
    
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$%!*?&])[A-Za-z\d@$%!&?*]{8,}$/;

    emailError.textContent = "";
    passwordError.textContent = "";

    let isValid = true;

    if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email";
        emailError.style.color = "violet";
        isValid = false;
    }

    if (!passwordPattern.test(password)) {
        passwordError.textContent = "Password must be at least 8 characters long with lowercase, uppercase, special characters";
        passwordError.style.color = "violet";
        isValid = false;
    }

    if (isValid) {
        const data = { email, password };

        fetch('http://localhost/myproject/api.php', { // Update with your local PHP API endpoint
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert("Login successful");
                // Redirect or store session info
                window.location.href = '/dashboard'; // Redirect after login
            } else {
                alert("Login failed. Please check your credentials.");
            }
        })
        .catch(err => {
            console.error(err);
            alert("Login failed. Please try again later.");
        });
    }
}

function redirect() {
    window.location.href = '/register.html';
}
