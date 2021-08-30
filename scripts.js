const display = document.getElementById("display")

const state = {
    items: 0,
    drinks: null
}

console.log('drinks state', state.drinks)

const cartItems = (state) => {
    return `<span>${state}</span>`;
}

function renderCartItems() {
    display.innerHTML = cartItems(state.items);
}

function incCountUp() {
    let newCount = state.items + 1;
    state.items = newCount;

    renderCartItems();
}

const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a'

const renderElements = (element) => {
    const newDiv = document.createElement("div");
    const newImg = document.createElement("img");
    const newHeader = document.createElement("H1")
    const newParagraph = document.createElement("p");
    const newButton = document.createElement("button");

    newButton.addEventListener('click', () => {
        incCountUp()
    })

    newHeader.innerText = element.strDrink
    newParagraph.innerText = element.strInstructions
    newButton.innerText = "Add to Cart"

    newDiv.appendChild(newImg);
    newImg.src = element.strDrinkThumb;
    newDiv.appendChild(newHeader);
    newDiv.appendChild(newParagraph);
    newDiv.appendChild(newButton);

    newDiv.classList.add("cardWrapper")
    newImg.classList.add("cardImg")
    newButton.classList.add("cardBtn")

    const body = document.getElementById("container");
    body.appendChild(newDiv);
}


async function fetchDrinks() {
    const response = await fetch(apiUrl);

    // Save the JSON data in a variable
    const jsonValue = await response.json();
    console.log(jsonValue);

    state.drinks = jsonValue

    const allDrinks = state.drinks.drinks;

    // Call Promise.resolve(value) to resolve the promise
    const promise = Promise.resolve(state.drinks.drinks)
    promise.then(function(val){
        console.log(val)
    })

    allDrinks.forEach(drink => {
        const { strDrink, strInstructions, strDrinkThumb } = jsonValue.drinks[7];
        renderElements(drink)

        document.querySelector(".cardImg").src = strDrinkThumb; 
    })
    console.log('drinks state', state.drinks)
}


