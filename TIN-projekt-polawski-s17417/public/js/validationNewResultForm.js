function validateForm() {
    const patientsInput = document.getElementById('patient_id');
    const orderDateInput = document.getElementById('orderDate');
    const resultDateInput = document.getElementById('resultDate');
    const labTestsInput = document.getElementById('labTest_id');
    const statusInput = document.getElementById('status');
    const resultValueInput = document.getElementById('resultValue');

    const errorPatients = document.getElementById('errorPatients');
    const errorOrderDate = document.getElementById('errorOrderDate');
    const errorResultDate = document.getElementById('errorResultDate');
    const errorLabTests = document.getElementById('errorLabTests');
    const errorStatus = document.getElementById('errorStatus');
    const errorResultValue = document.getElementById('errorResultValue');
    const errorSummary = document.getElementById('errorSummary');

    resetErrors([patientsInput, orderDateInput, resultDateInput, labTestsInput, statusInput, resultValueInput],
        [errorPatients, errorOrderDate, errorResultDate, errorLabTests, errorStatus, errorResultValue], errorSummary);

    let valid = true;


    if (!checkRequired(patientsInput.value)) {
        valid = false;
        patientsInput.classList.add("error-input");
        errorPatients.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(labTestsInput.value)) {
        valid = false;
        labTestsInput.classList.add("error-input");
        errorLabTests.innerText = "Pole jest wymagane";
    }

    if (resultValueInput.value && !checkNumber(resultValueInput.value)) {
        valid = false;
        resultValueInput.classList.add("error-input");
        errorResultValue.innerText = "Pole powinno być liczbą";
    }

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');

    if (orderDateInput.value && !checkDate(orderDateInput.value)) {
        valid = false;
        orderDateInput.classList.add("error-input");
        errorOrderDate.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
    } else if (checkDateIfAfter(orderDateInput.value, nowString)) {
        valid = false;
        orderDateInput.classList.add("error-input");
        errorOrderDate.innerText = "Data nie może być z przyszłości";
    } else if (checkDateIfAfter(resultDateInput.value, nowString)) {
        valid = false;
        resultDateInput.classList.add("error-input");
        errorResultDate.innerText = "Data nie może być z przyszłości";
    } else if (orderDateInput.value && resultDateInput.value && checkDate(resultDateInput.value)
        && !checkDateIfAfter(resultDateInput.value, orderDateInput.value)) {
        valid = false;
        resultDateInput.classList.add("error-input");
        errorResultDate.innerText = "Data wyniku musi być późniejsza niż zlecenia";
    }

    //ogolna infromacja
    if (!valid) {
        errorSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}