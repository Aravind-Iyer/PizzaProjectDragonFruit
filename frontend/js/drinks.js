document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

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

    // Fetch drink data dynamically from backend
    try {
        const response = await fetch('http://localhost:3000/api/drinks', {
            headers: { Authorization: `Bearer ${token}` }
        });

        // If the response is not OK, log the status and throw an error
        if (!response.ok) {
            console.error('Error in response:');
            console.error('Status:', response.status);
            console.error('Response Text:', await response.text());
            throw new Error('Failed to fetch drinks.');
        }

        const drinks = await response.json();
        console.log('Fetched Drinks:', drinks); // Log the fetched data
        renderDrinkCards(drinks);
    } catch (error) {
        console.error('Fetch error:', error); // Log the full error in the console
        alert('Could not load drinks. Please try again later.');
    }
});

// Render the drink cards dynamically
function renderDrinkCards(drinks) {
    const drinkOptionsContainer = document.querySelector('.drink-options');
    drinkOptionsContainer.innerHTML = ''; // Clear the container

    drinks.forEach((drink) => {
        const drinkCard = document.createElement('div');
        drinkCard.classList.add('drink-item');
        drinkCard.id = `drink-${drink.DrinkID}`;

        drinkCard.innerHTML = `
            <img src="${drink.ImageURL}" alt="${drink.DrinkName}">
            <h3>${drink.DrinkName}</h3>
            <p id="price-${drink.DrinkID}">$${drink.Cost.toFixed(2)}</p>
            <form>
                ${['Small', 'Medium', 'Large'].map((size) => `
                    <input type="radio" id="${size.toLowerCase()}${drink.DrinkID}" name="size${drink.DrinkID}" value="${size}">
                    <label for="${size.toLowerCase()}${drink.DrinkID}">${size}</label><br>
                `).join('')}
            </form>
            <div class="quantity">
                <label for="quantity-${drink.DrinkID}">Qty:</label>
                <input type="number" id="quantity-${drink.DrinkID}" min="1" value="1">
            </div>
            <button onclick="addToCart(${drink.DrinkID})">Add to Cart</button>
        `;

        drinkOptionsContainer.appendChild(drinkCard);
    });
}

// Hamburger menu toggle
function toggleMenu() {
    const menu = document.getElementById("hamburgerMenu");
    menu.classList.toggle("d-none");
    menu.classList.toggle("d-block");
}

// Add item to cart
async function addToCart(drinkId) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You must be logged in to add items to the cart.');
        return;
    }

    const size = document.querySelector(`input[name="size${drinkId}"]:checked`)?.value;
    if (!size) {
        alert('Please select a size for the drink.');
        return;
    }

    const quantity = parseInt(document.querySelector(`#quantity-${drinkId}`).value, 10);
    if (isNaN(quantity) || quantity <= 0) {
        alert('Please enter a valid quantity.');
        return;
    }

    const price = parseFloat(
        document.querySelector(`#price-${drinkId}`).textContent.replace('$', '')
    );

    try {
        const response = await fetch('http://localhost:3000/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                customerId: 1, // Replace with dynamic customer ID
                itemId: drinkId,
                itemType: 'Drink',
                itemName: document.querySelector(`#drink-${drinkId} h3`).textContent,
                size: size,
                quantity: quantity,
                cost: price
            })
        });

        if (!response.ok) {
            throw new Error('Failed to add item to cart.');
        }

        alert(`Added ${quantity} ${size} of drink to cart!`);
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
