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
            throw new Error('Failed to fetch desserts.');
        }

        const desserts = await response.json();
        console.log('Fetched Desserts:', desserts); // Log the fetched data
        updateDessertPlaceholders(desserts);
    } catch (error) {
        console.error('Fetch error:', error); // Log the full error in the console
        alert('Could not load desserts. Please try again later.');
    }
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

// Update placeholders with dynamic data
function updateDessertPlaceholders(desserts) {
    desserts.forEach((dessert, index) => {
        const dessertCard = document.getElementById(`dessert-${index + 1}`);
        if (dessertCard) {
            dessertCard.querySelector('img').src = dessert.ImageURL;
            dessertCard.querySelector('h3').textContent = dessert.DessertName;
            dessertCard.querySelector(`#price-${index + 1}`).textContent = `$${dessert.Cost.toFixed(2)}`;
            dessertCard.querySelector('button').setAttribute(
                'onclick',
                `addToCart(${dessert.DessertID}, '${dessert.DessertName}')`
            );
        }
    });
}

// Hamburger menu toggle
function toggleMenu() {
    const menu = document.getElementById("hamburgerMenu");
    menu.classList.toggle("d-none");
    menu.classList.toggle("d-block");
}

async function addToCart(dessertId, dessertName) {
    const quantityInput = document.querySelector(`#quantity-${dessertId}`);
    const quantity = parseInt(quantityInput.value, 10);
    const customerId = localStorage.getItem('customerId');

    if (!customerId) {
        alert('Customer ID is missing. Please log in again.');
        return;
    }

    if (isNaN(quantity) || quantity <= 0) {
        alert('Please enter a valid quantity.');
        return;
    }

    if (quantity > 5) {
        alert(`You can only add up to 5 of ${dessertName}.`);
        quantityInput.value = 5; // Reset quantity to the maximum allowed
        return;
    }

    const priceSelector = `#price-${dessertId}`;
    const priceElement = document.querySelector(priceSelector);

    if (!priceElement) {
        alert(`Price element not found for ${dessertName}.`);
        return;
    }

    const cost = parseFloat(priceElement.textContent.replace('$', ''));

    console.log({
        customerId: parseInt(customerId, 10),
        itemId: dessertId,
        itemType: 'Dessert',
        itemName: dessertName,
        quantity: quantity,
        cost: cost,
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
                customerId: parseInt(customerId, 10),
                itemId: dessertId,
                itemType: 'Dessert',
                itemName: dessertName,
                quantity: quantity,
                cost: cost,
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
