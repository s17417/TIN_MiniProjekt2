function validateForm() {
    const nameInput = document.getElementById('name');
    const unitsInput = document.getElementById('units');

    const errorName = document.getElementById('errorName');
    const errorUnits = document.getElementById('errorUnits');
    const errorSummary = document.getElementById('errorSummary');

    resetErrors([nameInput, unitsInput], [errorName, errorUnits], errorSummary);

    let valid = true;

    //walidacja nazwy
    if (!checkRequired(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole wymagane";
    } else if (!checkTextLengthRange(nameInput.value, 2, 100)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole powinno zawierać od 2 do 100 znaków";
    }

    //walidacja nazwiska
    if (!checkRequired(unitsInput.value)) {
        valid = false;
        unitsInput.classList.add("error-input");
        errorUnits.innerText = "Pole wymagane";
    } else if (!checkTextLengthRange(unitsInput.value, 2, 60)) {
        valid = false;
        unitsInput.classList.add("error-input");
        errorUnits.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    //ogolna infromacja
    if (!valid) {
        errorSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}