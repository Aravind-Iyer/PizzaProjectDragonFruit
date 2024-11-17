// pizza.js

// Check if user is logged in
if (!localStorage.getItem('token')) {
    alert('You must be logged in to access the menu.');
    window.location.href = 'login.html'; // Redirect to login page
}

// Initialize DOM elements after content is loaded
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    // DOM elements
    const accountInfoButton = document.querySelector('.header-right button:first-child'); // Account Info button
    const logoutButton = document.querySelector('.header-right button.btn-warning'); // Logout button
    const cartButton = document.querySelector('.go-to-cart-button');

    // Show/hide Account Info and Logout buttons based on authentication
    if (token) {
        accountInfoButton.style.display = 'inline-block';
        logoutButton.style.display = 'inline-block';
    } else {
        accountInfoButton.style.display = 'none';
        logoutButton.style.display = 'none';
    }

    // Fetch cart items count (if cart exists in localStorage)
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemCount = cart.reduce((total, item) => total + item.Quantity, 0);

    // Update "Go to Cart" button dynamically
    if (itemCount > 0) {
        cartButton.textContent = `🛒 Go to Cart (${itemCount})`;
    } else {
        cartButton.textContent = `🛒 Go to Cart`;
    }

    // Set up custom pizza form
    const pizzaForm = document.getElementById('pizzaForm');
    const costDisplay = document.getElementById('costDisplay');
    let totalCost = 0;

    // Update total cost on form changes
    pizzaForm.addEventListener('change', () => {
        totalCost = calculateCost();
        costDisplay.textContent = `Total Cost: $${totalCost.toFixed(2)}`;
    });

    // Handle form submission
    pizzaForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent page reload
        const formData = new FormData(pizzaForm);

        const pizzaDetails = {
            crust: formData.get('crust'),
            sauce: formData.get('sauce'),
            toppings: formData.getAll('toppings'),
            size: formData.get('size'),
            pizzaName: formData.get('pizzaName'),
            cost: totalCost,
        };

        // Simulate adding to cart
        console.log('Pizza Details:', pizzaDetails);
        alert('Your custom pizza has been added to the cart.');

        // TODO: Send pizzaDetails to backend API in future implementation
    });

    // Helper function: Calculate total cost
    function calculateCost() {
        let cost = 8; // Base cost for small pizza
        const size = pizzaForm.querySelector('#size').value;

        // Adjust cost for pizza size
        if (size === 'medium') cost += 2;
        if (size === 'large') cost += 4;

        // Add cost for toppings (max charge for 3 toppings at $1 each)
        const toppings = pizzaForm.querySelectorAll('#toppings option:checked').length;
        cost += Math.min(toppings, 3); // Only charge for up to 3 toppings

        return cost;
    }
});

// Function to toggle the hamburger menu
function toggleMenu() {
    const menu = document.getElementById('hamburgerMenu');
    menu.classList.toggle('d-none');
    menu.classList.toggle('d-block');
}

// Navigation functions
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
