let main = {}, card = {}, form = { email:{},name:{},submit:{}}, page = {}, loadingwindow;

let getDOMElements = () => {

    form.email.input = document.querySelector(".js-form-email-input");
    form.email.message = document.querySelector(".js-form-email-message");
    form.email.field = document.querySelector(".js-form-email-field");
    
    form.name.input = document.querySelector(".js-form-name-input");
    form.name.message = document.querySelector(".js-form-name-message");
    form.name.field = document.querySelector(".js-form-name-field");

    form.submit = document.querySelector(".js-form-submit");


    card.title = document.querySelector(".js-card__title");
    card.desc = document.querySelector(".js-card__desc");
    card.image = document.querySelector(".js-card__image");
    
    card.button = document.querySelector(".js-button");
    card.idgredients = document.querySelector(".js-ingredients")
    console.log(card.button)
    if(card.button){
        card.button.addEventListener("click",() => {
            
            getCoffeeAPI()
        });
    }
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

const getCoffeeAPI = function(){
    // Eerst bouwen we onze url op
	let url = `https://api.sampleapis.com/coffee/hot`;
	// Met de fetch API proberen we de data op te halen.
	fetch(url)
		.then(req => {
			if (!req.ok) {
				console.error('Error with fetch');
			} else {
				return req.json();
			}
		})
		.then(json => {
			console.log(json[0].title);
            showCoffee(json)
		});
    // Als dat gelukt is, gaan we naar onze showCoffee functie.
    
};


let showCoffee = function(json){
    let random = Math.floor(Math.random() * 20)
    console.log(random)
    console.log(json[random])
    card.title.innerHTML = json[random].title
    card.desc.innerHTML = json[random].description
    card.idgredients.innerHTML = " ";
    card.image.src = `img/coffee/${random + 1}.jpg`
    json[random].ingredients.forEach(element => {
        console.log(element)
        card.idgredients.innerHTML += 
        `<div> - ${element}</div>`;
    });
}
document.addEventListener('DOMContentLoaded', function () {
    getDOMElements();

    page.brew = document.querySelector(".js-page-brew");
    page.landing = document.querySelector(".js-page-landing");

    if (page.brew) {
        
        getCoffeeAPI();
    }
    if (page.landing) {
        enableListeners();
    }
});