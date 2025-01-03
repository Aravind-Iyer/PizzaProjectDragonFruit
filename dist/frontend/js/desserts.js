document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const isManager = localStorage.getItem('isManager') === 'true';

    // Get buttons by their IDs
    const accountInfoButton = document.getElementById('accountInfoButton');
    const logoutButton = document.getElementById('logoutButton');
    const managerDashboardButton = document.getElementById('managerDashboardButton');

    if (token) {
        // Show "Account Info" and "Logout" buttons if logged in
        accountInfoButton.style.display = 'inline-block';
        logoutButton.style.display = 'inline-block';

        // Show "Manager Dashboard" button if user is a manager
        if (isManager) {
            managerDashboardButton.style.display = 'inline-block';
        }
    } else {
        // Hide all buttons (extra safety check)
        accountInfoButton.style.display = 'none';
        logoutButton.style.display = 'none';
        managerDashboardButton.style.display = 'none';
    }

    // Fetch dessert data dynamically from backend
    try {
        const response = await fetch('http://localhost:3000/api/desserts', {
            headers: { Authorization: `Bearer ${token}` }
        });


        if (!response.ok) {
            console.error('Error in response:');
            console.error('Status:', response.status);
            console.error('Response Text:', await response.text());
            throw new Error('Failed to fetch desserts.');
        }

        const desserts = await response.json();
        console.log('Fetched Desserts:', desserts);
        updateDessertPlaceholders(desserts);
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Could not load desserts. Please try again later.');
    }
    const cartButton = document.querySelector('.go-to-cart-button');


    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemCount = cart.reduce((total, item) => total + item.Quantity, 0);

    // i tried it wont work dont bother but i kept it here for just in case
    if (itemCount > 0) {
        cartButton.textContent = `🛒 Go to Cart (${itemCount})`;
    } else {
        cartButton.textContent = `🛒 Go to Cart`;
    }

});


function updateDessertPlaceholders(desserts) {
    desserts.forEach((dessert, index) => {
        const dessertCard = document.getElementById(`dessert-${index + 1}`);
        if (dessertCard) {
            dessertCard.querySelector('img').src = `http://localhost:3000/${dessert.ImageURL}`;
            dessertCard.querySelector('h3').textContent = dessert.DessertName;
            dessertCard.querySelector(`#price-${index + 1}`).textContent = `$${dessert.Cost.toFixed(2)}`;
            dessertCard.querySelector('button').setAttribute(
                'onclick',
                `addToCart(${dessert.DessertID}, '${dessert.DessertName}')`
            );
        }
    });
}


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
function goToManagerDashboard() {
    window.location.href = 'managerDashboard.html';
}