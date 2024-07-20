
const inputDay = document.querySelector('#day');
const inputMonth = document.querySelector('#month');
const inputYear = document.querySelector('#year');
const btn = document.querySelector('#submit');
btn.addEventListener('click', () => {
    calculateAge();
});
function calculateAge() {
    const day = parseInt(inputDay.value);
    const month = parseInt(inputMonth.value) - 1;
    const year = parseInt(inputYear.value);
    if (!isNumber(day, month, year)) {
        resetResult();
        return;
    }
    if (!isValidDate(day, month, year)) {
        resetResult();
        return;
    }

    const currentDate = new Date();
    let age = currentDate.getFullYear() - year;
    let months = currentDate.getMonth() - month;
    let days = currentDate.getDate() - day;

    if (days < 0) {
        months--;
        days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    }
    if (months < 0) {
        age--;
        months += 12;
    }
    showResult(age, months, days);
}
function showError(message, element) {
    document.querySelector(`#lbl-${element.id}`).classList.add('error-lbl');
    const errorLbl = document.querySelector(`.error-${element.id}`);
    errorLbl.classList.remove('hidden');
    errorLbl.textContent = message;
    element.classList.add('error');
    setTimeout(() => {
        document.querySelector(`#lbl-${element.id}`).classList.remove('error-lbl');
        errorLbl.classList.add('hidden');
        element.classList.remove('error');
    }, 3000);
}
function isNumber(day, month, year) {
    let validado = true;
    if (isNaN(day)) {
        showError('This field is required', inputDay);
        validado = false;
    }
    if (isNaN(month)) {
        showError('This field is required', inputMonth);
        validado = false;
    }
    if (isNaN(year)) {
        showError('This field is required', inputYear);
        validado = false;
    }
    return validado;
}
function isValidDate(day, month, year) {
    let validado = true;
    const currentDate = new Date();
    if (currentDate.getFullYear() < year) {
        showError('Must be in the past', inputYear);
        validado = false;
    }
    if (month > 11 || month < 0) {
        showError('Must be a valid month', inputMonth);
        validado = false;
    }
    if (!isValidDay(day, month, year)) {
        showError('Must be a valid day', inputDay);
        validado = false;
    }
    return validado;
}
function isValidDay(dia, mes, año) {
    const fecha = new Date(año, mes, dia);
    return fecha.getDate() === dia && fecha.getMonth() === mes && fecha.getFullYear() === año;
}
function resetResult() {
    document.querySelector('.result-years').textContent = '--';
    document.querySelector('.result-months').textContent = '--';
    document.querySelector('.result-days').textContent = '--';
}
function showResult(age, months, days) {
    const ageSpan = document.querySelector('.result-years');
    const monthsSpan = document.querySelector('.result-months');
    const daysSpan = document.querySelector('.result-days');
    ageSpan.textContent = age;
    monthsSpan.textContent = months;
    daysSpan.textContent = days;
}

