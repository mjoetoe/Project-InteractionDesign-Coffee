let main = {},  form = { email:{},name:{},submit:{}}, page = {}, loadingwindow;


let getDOMElements = () => {

    form.email.input = document.querySelector(".js-form-email-input");
    form.email.message = document.querySelector(".js-form-email-message");
    form.email.field = document.querySelector(".js-form-email-field");
    
    form.name.input = document.querySelector(".js-form-name-input");
    form.name.message = document.querySelector(".js-form-name-message");
    form.name.field = document.querySelector(".js-form-name-field");


    form.submit = document.querySelector(".js-form-submit");
}

let enableListeners = () => {
    
    form.email.input.addEventListener('blur', function () {
        if (!isValid(form.email)) {
            form.email.input.addEventListener("input", doubleCheckEmail);
            isEmpty(form.email.input.value) == false ?
                
                addErrors(form.email, "Invalid email ❌") :
                addErrors(form.email, "This field is required ✋🏼");
        } else {
            form.email.input.removeEventListener("input", doubleCheckEmail);
        }
    });

    form.name.input.addEventListener('blur', function() {
        if (!isValid(form.name)) {
            form.name.input.addEventListener("input", doubleCheckName);
            isEmpty(form.name.input.value) == false ?
                addErrors(form.name, "Invalid name, too short ❌") :
                addErrors(form.name, "This field is required ✋🏼");
        } else {
            form.name.input.removeEventListener("input", doubleCheckName);
        }
         
    });
}

const isEmpty = function (fieldValue) {
    return !fieldValue || !fieldValue.length;
};

const isValid = function (obj) {
    if (obj === form.email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(obj.input.value);
    } else if (obj === form.name) {
        return obj.input.value.length > 2;
    } else {
        return false;
    }
};

const doubleCheckEmail = function () {
    if (!isEmpty(form.email.input.value) && !isValid(form.email)) {
        addErrors(form.email, "Invalid email ❌");
    } else {
        removeErrors(form.email);
    }
};

const doubleCheckName = function() {
    if (!isEmpty(form.name.input.value) && !isValid(form.name)) {
        addErrors(form.name, "Invalid name, too short ❌");
    } else {
        removeErrors(form.name);
    }
};

const addErrors = function (globalVar, message) {
    globalVar.field.classList.add("has-error");
    globalVar.message.innerHTML = message;
}

const removeErrors = function (globalVar) {
    globalVar.field.classList.remove("has-error");
    globalVar.message.innerHTML = "";
}

document.addEventListener('DOMContentLoaded', function () {
    getDOMElements();

    page.find = document.querySelector(".js-page-find");
    page.intro = document.querySelector(".js-page-intro");

    enableListeners();
});