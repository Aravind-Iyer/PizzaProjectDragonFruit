
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!localStorage.getItem('token')) {
        alert('You must be logged in to access the menu.');
        window.location.href = 'login.html';
    }


    const accountInfoButton = document.querySelector('.header-right button:first-child');
    const logoutButton = document.querySelector('.header-right button.btn-warning');

    if (token) {
        accountInfoButton.style.display = 'inline-block';
        logoutButton.style.display = 'inline-block';
    } else {
        accountInfoButton.style.display = 'none';
        logoutButton.style.display = 'none';
    }

    // Fetch sides data dynamically from backend
    try {
        const response = await fetch('http://localhost:3000/api/sides', {
            headers: { Authorization: `Bearer ${token}` },
        });


        if (!response.ok) {
            console.error('Error in response:', response.status);
            throw new Error('Failed to fetch sides.');
        }

        const sides = await response.json();
        console.log('Fetched Sides:', sides); // Debug log
        renderSides(sides); // Call render function
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Could not load sides. Please try again later.');
    }


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


    if (itemCount > 0) {
        cartButton.textContent = `🛒 Go to Cart (${itemCount})`;
    } else {
        cartButton.textContent = `🛒 Go to Cart`;
    }
});

// Render sides dynamically into the DOM
function renderSides(sides) {
    const sidesContainer = document.querySelector('.sides-options');
    sidesContainer.innerHTML = '';

    sides.forEach((side) => {
        const imagePath = `/${side.ImageURL}`;
        const sideItem = `
            <div class="sides-item">
                <img src="${imagePath}" alt="${side.SidesName}">
                <h3>${side.SidesName}</h3>
                <p>$${side.Cost.toFixed(2)}</p>
                <div class="quantity">
                    <label for="quantity-${side.SidesID}">Qty:</label>
                    <input type="number" id="quantity-${side.SidesID}" min="1" value="1">
                </div>
                <button onclick="addToCart(${side.SidesID}, '${side.SidesName}', ${side.Cost})">Add to Cart</button>
            </div>
        `;
        sidesContainer.innerHTML += sideItem;
    });
}


async function addToCart(sidesID, sidesName, cost) {
    const quantityInput = document.querySelector(`#quantity-${sidesID}`);
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
        alert(`You can only add up to 5 ${sidesName}.`);
        quantityInput.value = 5; // Reset quantity to maximum allowed
        return;
    }


    try {
        const response = await fetch('http://localhost:3000/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                customerId: parseInt(customerId, 10),
                itemId: sidesID,
                itemType: 'Side',
                itemName: sidesName,
                quantity: quantity,
                cost: cost,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error adding to cart:', errorText);
            throw new Error('Failed to add item to cart.');
        }

        alert(`Added ${quantity} ${sidesName} to your cart!`);
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

function toggleMenu() {
    const menu = document.getElementById('hamburgerMenu');
    menu.classList.toggle('d-none');
    menu.classList.toggle('d-block');
}
