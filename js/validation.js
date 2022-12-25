
function validateField(inputId, type) {
    const errorMsgElement = document.getElementById(`${inputId}-error`);
    const inputElement = document.getElementById(`${inputId}`);

    if (inputElement?.value === '') {
        errorMsgElement.innerHTML = `${inputId} is required!`;
        inputElement.classList.add('input-error');
        return false;
    }
    if(type === 'number') {
        const regPattern = new RegExp(/^([1-9][0-9]+|[1-9])$/)
        if (!regPattern.test(+inputElement?.value)) {
            errorMsgElement.innerHTML = `${inputId} must be positive!`;
            inputElement.classList.add('input-error');
            return false;
        }
    }
    errorMsgElement.innerHTML = '';
    inputElement.classList.remove('input-error');
    return true;
}

// Assign direct function in html file with type module
window.validateField = validateField;
 
