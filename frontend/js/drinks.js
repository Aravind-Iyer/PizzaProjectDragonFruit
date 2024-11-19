document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const isManager = JSON.parse(localStorage.getItem('isManager')) || false;

    // Select buttons by their IDs
    const managerDashboardButton = document.getElementById('managerDashboardButton');
    const accountInfoButton = document.getElementById('accountInfoButton');
    const logoutButton = document.getElementById('logoutButton');

    if (token) {
        // Show Account Info and Logout buttons for all logged-in users
        accountInfoButton.style.display = 'inline-block';
        logoutButton.style.display = 'inline-block';

        // Show Manager Dashboard button only for managers
        if (isManager) {
            managerDashboardButton.style.display = 'inline-block';
        } else {
            managerDashboardButton.style.display = 'none';
        }
    } else {
        // Hide all buttons if user is not logged in
        accountInfoButton.style.display = 'none';
        logoutButton.style.display = 'none';
        managerDashboardButton.style.display = 'none';
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

    // Close the hamburger menu when clicking outside
    document.addEventListener('click', (event) => {
        const menu = document.getElementById('hamburgerMenu');
        const menuButton = document.querySelector('.hamburger-container button');

        if (menu && !menu.contains(event.target) && !menuButton.contains(event.target)) {
            menu.classList.add('d-none');
            menu.classList.remove('d-block');
        }
    })
    const cartButton = document.querySelector('.go-to-cart-button');

    // Fetch cart items count (assuming cart is stored in localStorage)
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemCount = cart.reduce((total, item) => total + item.Quantity, 0);

    // Update the button text dynamically
    if (itemCount > 0) {
        cartButton.textContent = `🛒 Go to Cart (${itemCount})`;
    } else {
        cartButton.textContent = `🛒 Go to Cart`;
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
    const customerId = localStorage.getItem('customerId'); // Retrieve customerId from localStorage

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
                customerId: parseInt(customerId, 10), // Use the dynamic customerId
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
