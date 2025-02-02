function validateForm(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var gender = document.querySelector('input[name="gender"]:checked')?.value;
    
    var firstPattern = /^[a-zA-Z]+$/;
    var lastPattern = /^[a-zA-Z]+$/;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    var emailError = document.getElementById("emailError");
    var passwordError = document.getElementById("passwordError");
    var firstnameError = document.getElementById("firstnameError");
    var lastnameError = document.getElementById("lastnameError");
    var genderError = document.getElementById("genderError");

    emailError.innerHTML = "";
    passwordError.innerHTML = "";
    firstnameError.innerHTML = "";
    lastnameError.innerHTML = "";
    genderError.innerHTML = "";

    var isValid = true;

    if(!emailPattern.test(email)){
        emailError.innerHTML = "Please enter a valid email";
        emailError.style.color = "violet";
        isValid = false;
    }

    if(!passwordPattern.test(password)){
        passwordError.innerHTML = "Password must be at least 8 characters long with lowercase, uppercase, and special characters";
        passwordError.style.color = "violet";
        isValid = false;
    }

    if(!firstPattern.test(firstname)){
        firstnameError.innerHTML = "Please enter a valid first name";
        firstnameError.style.color = "violet";
        isValid = false;
    }

    if(!lastPattern.test(lastname)){
        lastnameError.innerHTML = "Please enter a valid last name";
        lastnameError.style.color = "violet";
        isValid = false;
    }

    if(!gender){
        genderError.innerHTML = "Please select a gender";
        genderError.style.color = "violet";
        isValid = false;
    }

    if(isValid){
        var userData = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            gender: gender
        };
        
        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
            } else {
                alert("Account created successfully!");
                window.location.href = "page1.html";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("There was an error creating your account.");
        });
    }

    return isValid;
}
