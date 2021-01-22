function validateForm() {
    const patientsInput = document.getElementById('patient_id');
    const orderDateInput = document.getElementById('orderDate');
    const resultDateInput = document.getElementById('resultDate');
    const labTestsInput = document.getElementById('labTest_id');
    const statusInput = document.getElementById('status');
    const resultValueInput = document.getElementById('resultValue');
    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const lenMessage = document.getElementById('errorMessage-textLengthRange').innerText;
    const sumMessage= document.getElementById('errorMessage-summary').innerText;
    const futMessage= document.getElementById('errorMessage-futureDate').innerText;
    const idLenMessage= document.getElementById('errorMessage-idNumberLength').innerText;    
    const numSizeMessage= document.getElementById('errorMessage-resultMaxNumber').innerText;    
    const dateFormatMessage= document.getElementById('errorMessage-dateFormat').innerText;    
    const resDatAftOrdDatMessage= document.getElementById('errorMessage-resDatAftOrdDat').innerText;    



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
        errorPatients.innerText = reqMessage;
    }

    if (!checkRequired(labTestsInput.value)) {
        valid = false;
        labTestsInput.classList.add("error-input");
        errorLabTests.innerText = reqMessage;
    }

    if (resultValueInput.value && (!checkNumber(resultValueInput.value) || !checkREGEX(resultValueInput.value,/^(\d{0,7})(([.,]\d*)|)$/))) {
        valid = false;
        resultValueInput.classList.add("error-input");
        errorResultValue.innerText = numSizeMessage;
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
        errorOrderDate.innerText = dateFormatMessage;
    } else if (checkDateIfAfter(orderDateInput.value, nowString)) {
        valid = false;
        orderDateInput.classList.add("error-input");
        errorOrderDate.innerText = futMessage;
    } else if (checkDateIfAfter(resultDateInput.value, nowString)) {
        valid = false;
        resultDateInput.classList.add("error-input");
        errorResultDate.innerText = futMessage;
    } else if (orderDateInput.value && resultDateInput.value && checkDate(resultDateInput.value)
        && !checkDateIfAfter(resultDateInput.value, orderDateInput.value)) {
        valid = false;
        resultDateInput.classList.add("error-input");
        errorResultDate.innerText = resDatAftOrdDatMessage;
    }

    //ogolna infromacja
    if (!valid) {
        errorSummary.innerText = sumMessage;
    }

    return valid;
}