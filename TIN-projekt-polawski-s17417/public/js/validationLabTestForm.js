function validateForm() {
    const nameInput = document.getElementById('name');
    const unitsInput = document.getElementById('units');

    const errorName = document.getElementById('errorName');
    const errorUnits = document.getElementById('errorUnits');
    const errorSummary = document.getElementById('errorSummary');
    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const lenMessage = document.getElementById('errorMessage-textLengthRange').innerText;
    const sumMessage= document.getElementById('errorMessage-summary').innerText;
    resetErrors([nameInput, unitsInput], [errorName, errorUnits], errorSummary);

    let valid = true;

    //walidacja nazwy
    if (!checkRequired(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = reqMessage;
    } else if (!checkTextLengthRange(nameInput.value, 2, 100)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = lenMessage;
    }

    //walidacja nazwiska
    if (!checkRequired(unitsInput.value)) {
        valid = false;
        unitsInput.classList.add("error-input");
        errorUnits.innerText = reqMessage;
    } else if (!checkTextLengthRange(unitsInput.value, 2, 60)) {
        valid = false;
        unitsInput.classList.add("error-input");
        errorUnits.innerText = lenMessage;
    }

    //ogolna infromacja
    if (!valid) {
        errorSummary.innerText = sumMessage;
    }

    return valid;
}