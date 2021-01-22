function validateForm() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const password1Input = document.getElementById('password1');

    const errorEmail = document.getElementById('errorEmail');
    const errorPassword = document.getElementById('errorPassword');
    const errorPassword1 = document.getElementById('errorPassword1');

    
    const errorSummary = document.getElementById('errorSummary');
    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const lenMessage = document.getElementById('errorMessage-textLengthRange').innerText;
    const sumMessage= document.getElementById('errorMessage-summary').innerText;
    const emailMessage= document.getElementById('errorMessage-email').innerText;
    const passIdntyMessage= document.getElementById('errorMessage-passwords').innerText;

    
    resetErrors([emailInput, passwordInput, password1Input], [errorEmail, errorPassword, errorPassword1], errorSummary);

    let valid = true;

    //walidacja emaila
    if (!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = reqMessage;
    } else if (!checkTextLengthRange(emailInput.value, 5, 60)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = lenMessage;
    } else if (!checkEmail(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = emailMessage;
    }

    //walidacja hasła
    if (!checkRequired(passwordInput.value)) {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = reqMessage;
    } else if (!checkTextLengthRange(passwordInput.value, 2, 60)) {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = lenMessage;
    } else if (!checkRequired(password1Input.value)) {
        valid = false;
        password1Input.classList.add("error-input");
        errorPassword1.innerText = reqMessage;
    } else if (!checkTextLengthRange(password1Input.value, 2, 60)) {
        valid = false;
        password1Input.classList.add("error-input");
        errorPassword1.innerText = lenMessage;
    } else if (passwordInput.value!=password1Input.value){
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = passIdntyMessage;
    }

    //ogolna infromacja
    if (!valid) {
        errorSummary.innerText = sumMessage;
    }

    return valid;
}