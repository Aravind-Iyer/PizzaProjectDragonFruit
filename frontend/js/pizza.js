if (!localStorage.getItem('token')) {
    alert('You must be logged in to access the menu.');
    window.location.href = 'login.html'; // Redirect to login page
}

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const isManager = JSON.parse(localStorage.getItem('isManager')) || false;

    // Account Info and Logout buttons
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

    // Update Cart Button with Item Count
    const cartButton = document.querySelector('.go-to-cart-button');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemCount = cart.reduce((total, item) => total + item.Quantity, 0);
    cartButton.textContent = itemCount > 0 ? `🛒 Go to Cart (${itemCount})` : '🛒 Go to Cart';

    // Pizza Form Logic
    const costDisplay = document.getElementById('costDisplay');
    let baseCost = 8;
    let totalCost = baseCost;
    const selectedToppings = new Set();

    // Toppings selection logic
    document.querySelectorAll('.center-section input[type="checkbox"]').forEach(input => {
        input.addEventListener('change', () => {
            if (input.checked) {
                selectedToppings.add(input.value);
                totalCost += 1.5; // $1.5 per topping
            } else {
                selectedToppings.delete(input.value);
                totalCost -= 1.5;
            }
            updateCost();
        });
    });

    // Update cost display
    function updateCost() {
        const size = document.getElementById('size').value;
        const cheese = document.getElementById('cheese').value;

        let sizeCost = 0;
        if (size === 'medium') sizeCost = 2;
        if (size === 'large') sizeCost = 4;
        if (size === 'extraLarge') sizeCost = 6;

        // Cheese cost logic
        let cheeseCost = 0;
        if (cheese === 'light') cheeseCost = 0.5;
        if (cheese === 'normal') cheeseCost = 1;
        if (cheese === 'extra') cheeseCost = 2;

        costDisplay.textContent = `Total Cost: $${(baseCost + sizeCost + cheeseCost + selectedToppings.size * 1.5).toFixed(2)}`;
    }

    // Trigger cost updates on size and cheese change
    document.getElementById('size').addEventListener('change', updateCost);
    document.getElementById('cheese').addEventListener('change', updateCost);

    // Add to Cart
    document.getElementById('addToCartBtn').addEventListener('click', async () => {
        const pizzaName = document.getElementById('pizzaName').value;
        if (!pizzaName.trim()) {
            alert('Please enter a name for your pizza.');
            return;
        }

        // Gather pizza details
        const pizzaDetails = {
            crust: document.getElementById('crust').value,
            sauce: document.getElementById('sauce').value,
            cheese: document.getElementById('cheese').value,
            size: document.getElementById('size').value,
            toppings: Array.from(selectedToppings),
            name: pizzaName,
            cost: parseFloat(costDisplay.textContent.replace('Total Cost: $', '')),
        };

        console.log('Pizza Details:', pizzaDetails);

        try {
            // Send pizza details to backend API
            const response = await fetch('/api/custom-pizza', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token if needed
                },
                body: JSON.stringify({
                    customerId: localStorage.getItem('customerId'), // Ensure customerId is set
                    pizzaName: pizzaDetails.name,
                    crust: pizzaDetails.crust,
                    sauce: pizzaDetails.sauce,
                    cheese: pizzaDetails.cheese,
                    size: pizzaDetails.size,
                    toppings: pizzaDetails.toppings,
                    cost: pizzaDetails.cost,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add pizza to the cart');
            }

            const data = await response.json();
            alert('Pizza added to cart successfully!');
            console.log('Response:', data);

        } catch (error) {
            console.error('Error adding pizza to cart:', error);
            alert('Error adding pizza to cart. Please try again.');
        }
    });
});

function toggleMenu() {
    const menu = document.getElementById('hamburgerMenu');
    menu.classList.toggle('d-none');
    menu.classList.toggle('d-block');

    // Close menu if clicked outside
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && e.target !== document.querySelector('.hamburger-container button')) {
            menu.classList.add('d-none');
        }
    });
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