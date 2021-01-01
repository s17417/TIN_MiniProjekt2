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
    
    resetErrors([firstnameInput, surnameInput, birthdateInput, idInput], [errorFirstname, errorSurname, errorBirthdate, erroridInput], errorSummary);
    
    let valid = true;

    //walidacja imienia
    if (!checkRequired(firstnameInput.value)) {
        valid = false;
        firstnameInput.classList.add("error-input");
        errorFirstname.innerText = "Pole wymagane";
    } else if (!checkTextLengthRange(firstnameInput.value, 2, 60)) {
        valid = false;
        firstnameInput.classList.add("error-input");
        errorFirstname.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    //walidacja nazwiska
    if (!checkRequired(surnameInput.value)) {
        valid = false;
        surnameInput.classList.add("error-input");
        errorSurname.innerText = "Pole wymagane";
    } else if (!checkTextLengthRange(surnameInput.value, 2, 60)) {
        valid = false;
        surnameInput.classList.add("error-input");
        errorSurname.innerText = "Pole powinno zawierać od 2 do 60 znaków";
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
        errorBirthdate.innerText = "Pole wymagane";
    } else if (checkDateIfAfter(birthdateInput.value, nowString)) {
        valid = false;
        birthdateInput.classList.add("error-input");
        errorBirthdate.innerText = "Data nie może być z przyszłości";
    }

    // Sprawdzenie numeru PESEL
    if (idInput.value && (!checkTextLengthRange(idInput.value, 11, 11) || !checkREGEX(idInput.value,/^(\d*)$/))) {
        valid = false;
        idInput.classList.add("error-input");
        erroridInput.innerText = "PESEL powinien być 11-cyfrowy";
    }

    //ogolna infromacja
    if (!valid) {
        errorSummary.innerText = "Formularz zawiera błędy";
    }
    return valid;
}