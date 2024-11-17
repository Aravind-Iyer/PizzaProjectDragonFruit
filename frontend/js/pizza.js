document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    var pizzaID = 0;
    var cost = 0;
    // Account Info and Logout Button Setup
    const accountInfoButton = document.querySelector('.header-right button:first-child');
    const logoutButton = document.querySelector('.header-right button.btn-warning');

    if (token) {
        accountInfoButton.style.display = 'inline-block';
        logoutButton.style.display = 'inline-block';
    } else {
        accountInfoButton.style.display = 'none';
        logoutButton.style.display = 'none';
    }

    // Fetch dessert data dynamically from backend
    try {
        const response = await fetch('http://localhost:3000/api/desserts', {
            headers: { Authorization: `Bearer ${token}` }
        });

        // If the response is not OK, log the status and the error message
        if (!response.ok) {
            console.error('Error in response:');
            console.error('Status:', response.status);
            console.error('Response Text:', await response.text());
            throw new Error('Failed to fetch pizza options.');
        }

        const desserts = await response.json();
        console.log('Fetched Desserts:', desserts); // Log the fetched data
        updatePizzaPlaceholders(desserts);
    } catch (error) {
        console.error('Fetch error:', error); // Log the full error in the console
        alert('Could not load desserts. Please try again later.');
    }

});

// Update placeholders with dynamic data
function updatePizzaPlaceholders(pizzas) {
        document.querySelector('form').onsubmit = function() {
            pizzaID += 10;
            e.preventDefault();

            const orm = require('orm');
            const db = orm.connect('mysql://localhost/Dragonfruit');

            var crust = document.querySelector('.crusts').value;
            var sauce = document.querySelector('.sauces').value;
            var cheese = document.querySelector('.cheeses').value;
            var topping1 = document.querySelector('.tp1').value;
            var topping2 = document.querySelector('.tp2').value;
            var topping3 = document.querySelector('.tp3').value;
            var topping4 = document.querySelector('.tp4').value;
            var topping5 = document.querySelector('.tp5').value;
            var size = document.querySelector('.size').value;
            var pizzaName = document.querySelector('#form-control').value;
            if (size === 'Small'){
                cost+=8;
            } else if (size === 'Medium'){
                cost+=10;
            } else if (size === 'Large'){
                cost+=12;
            } else if (size === 'Extra Large'){
                cost+=14;
            } else {
                console.log("Please select a size");
            }
            if (topping2 !== 'None'){
                if (document.querySelector('[title="meat"]')){
                    cost+=2;
                } else if (document.querySelector('[title="veggie"]')){
                    cost+=1;
                }
            }
            if (topping3 !== 'None'){
                if (document.querySelector('[title="meat"]')){
                    cost+=2;
                } else if (document.querySelector('[title="veggie"]')){
                    cost+=1;
                }
            }
            if (topping4 !== 'None'){
                if (document.querySelector('[title="meat"]')){
                    cost+=2;
                } else if (document.querySelector('[title="veggie"]')){
                    cost+=1;
                }
            }
            if (topping5 !== 'None'){
                if (document.querySelector('[title="meat"]')){
                    cost+=2;
                } else if (document.querySelector('[title="veggie"]')){
                    cost+=1;
                }
            }
            db.query('Insert into CustomPizzas (CustomPizzasID, Crust, Sauce, Cheese, ToppingOne, ToppingTwo, ToppingThree, ToppingFour, ToppingFive, Size, Cost, Quantity) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', (pizzaID, crust, sauce, cheese, topping1, topping2, topping3, topping4, topping5, size, cost, 1));
        }
        //goToHome();
        /*if (pizzaCard) {
            pizzaCard.querySelector('img').src = pizza.ImageURL;
            pizzaCard.querySelector('h3').textContent = pizza.DessertName;
            pizzaCard.querySelector(`#price-${index + 1}`).textContent = `$${pizza.Cost.toFixed(2)}`;
            pizzaCard.querySelector('button').setAttribute(
                'onclick',
                `addToCart(${pizza.DessertID}, '${pizza.DessertName}')`
            );
        }*/
}

// Hamburger menu toggle
function toggleMenu() {
    const menu = document.getElementById("hamburgerMenu");
    menu.classList.toggle("d-block");
    menu.classList.toggle("d-none");
}

async function addToCart(pizzaID, pizzaName) {
    const quantityInput = 1;
    const quantity = parseInt(1, 10);
    const customerId = localStorage.getItem('customerId');

    if (!customerId) {
        alert('Customer ID is missing. Please log in again.');
        return;
    }

    if (isNaN(quantity) || quantity <= 0) {
        alert('Please enter a valid quantity.');
        return;
    }

    const priceSelector = cost;
    const priceElement = document.querySelector(priceSelector);

    if (!priceElement) {
        alert(`Price element not found for ${pizzaName}`);
        return;
    }

    const cost = parseFloat(priceElement.textContent.replace('$', ''));

    console.log({
        CustomPizzasID: pizzaID,
        OptionsID: null,
        Crust: 'Pizza',
        Sauce: dessertName,
        Cheese: cheese,
        ToppingOne: topping1,
        ToppingTwo: topping2,
        ToppingThree: topping3,
        ToppingFour: topping4,
        ToppingFive: topping5,
        Cost: cost,
        Qty: 1
    });

    // Add the item to the cart in the backend
    try {
        const response = await fetch('http://localhost:3000/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                CustomPizzasID: pizzaID,
                OptionsID: null,
                Crust: 'Pizza',
                Sauce: dessertName,
                Cheese: cheese,
                ToppingOne: topping1,
                ToppingTwo: topping2,
                ToppingThree: topping3,
                ToppingFour: topping4,
                ToppingFive: topping5,
                Cost: cost,
                Qty: 1
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error adding to cart:', errorText);
            throw new Error('Failed to add item to cart.');
        }

        alert(`Added ${quantity} of ${dessertName} to cart!`);
    } catch (error) {
        console.error('Add to cart error:', error);
        alert('Could not add item to cart. Please try again.');
    }
}



function goToAccountInfo() {
    window.location.href = 'accountInfo.html';
}

function logout() {
    localStorage.removeItem('token');
    alert('You have successfully logged out.');
    window.location.href = 'home.html';
}

function goToHome() {
    window.location.href = 'home.html';
}