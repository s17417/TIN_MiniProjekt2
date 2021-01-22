function validateForm() {
    
    const firstnameInput = document.getElementById('firstname');
    const surnameInput = document.getElementById('surname');
    const birthdateInput = document.getElementById('birthdate');
    const idInput = document.getElementById('idnumber');
    
    const errorFirstname = document.getElementById('errorFirstname');
    const errorSurname = document.getElementById('errorSurname');
    const errorBirthdate = document.getElementById('errorBirthdate');
    const erroridInput = document.getElementById('errorId');
    const errorSummary = document.getElementById('errorSummary');
    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const lenMessage = document.getElementById('errorMessage-textLengthRange').innerText;
    const sumMessage= document.getElementById('errorMessage-summary').innerText;
    const futMessage= document.getElementById('errorMessage-futureDate').innerText;
    const idLenMessage= document.getElementById('errorMessage-idNumberLength').innerText;    

    resetErrors([firstnameInput, surnameInput, birthdateInput, idInput], [errorFirstname, errorSurname, errorBirthdate, erroridInput], errorSummary);
    
    let valid = true;

    //walidacja imienia
    if (!checkRequired(firstnameInput.value)) {
        valid = false;
        firstnameInput.classList.add("error-input");
        errorFirstname.innerText = reqMessage;
    } else if (!checkTextLengthRange(firstnameInput.value, 2, 60)) {
        valid = false;
        firstnameInput.classList.add("error-input");
        errorFirstname.innerText = lenMessage;
    }

    //walidacja nazwiska
    if (!checkRequired(surnameInput.value)) {
        valid = false;
        surnameInput.classList.add("error-input");
        errorSurname.innerText = reqMessage;
    } else if (!checkTextLengthRange(surnameInput.value, 2, 60)) {
        valid = false;
        surnameInput.classList.add("error-input");
        errorSurname.innerText = lenMessage;
    }

    //pobranie aktualnej daty
    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    //Sformatowanie aktualnej daty dd-mm-yyyy
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');

    //Sprawdzenie daty urodzenia
    if (!checkRequired(birthdateInput.value)) {
        valid = false;
        birthdateInput.classList.add("error-input");
        errorBirthdate.innerText = reqMessage;
    } else if (checkDateIfAfter(birthdateInput.value, nowString)) {
        valid = false;
        birthdateInput.classList.add("error-input");
        errorBirthdate.innerText = futMessage;
    }

    // Sprawdzenie numeru PESEL
    if (idInput.value && (!checkTextLengthRange(idInput.value, 11, 11) || !checkREGEX(idInput.value,/^(\d*)$/))) {
        valid = false;
        idInput.classList.add("error-input");
        erroridInput.innerText = idLenMessage;
    }

    //ogolna infromacja
    if (!valid) {
        errorSummary.innerText = sumMessage;
    }
    return valid;
}