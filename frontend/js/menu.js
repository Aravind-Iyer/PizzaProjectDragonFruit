// menu.js
// Immediate authentication check before page rendering
if (!localStorage.getItem('token')) {
    alert('You must be logged in to access the menu.');
    window.location.href = 'login.html'; // Redirect to login page
}

// menu.js

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const isManager = JSON.parse(localStorage.getItem('isManager')) || false;

    const managerDashboardButton = document.getElementById('managerDashboardButton');
    const accountInfoButton = document.getElementById('accountInfoButton');
    // Account Info button
    const logoutButton = document.querySelector('.header-right button.btn-warning'); // Logout button

    if (token) {
        accountInfoButton.style.display = 'inline-block';
        logoutButton.style.display = 'inline-block';

        if (isManager) {
            managerDashboardButton.style.display = 'inline-block';
        } else {
            managerDashboardButton.style.display = 'none';
        }
    } else {
        // Hide all buttons if the user is not logged in
        accountInfoButton.style.display = 'none';
        logoutButton.style.display = 'none';
        managerDashboardButton.style.display = 'none';
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


function toggleMenu() {
    const menu = document.getElementById("hamburgerMenu");
    menu.classList.toggle("d-none");
    menu.classList.toggle("d-block");
}

// Navigation logic for menu categories
function navigateToCategory(category) {
    switch (category) {
        case 'pizza':
            window.location.href = 'pizza.html';
            break;
        case 'sides':
            window.location.href = 'sides.html';
            break;
        case 'drinks':
            window.location.href = 'drinks.html';
            break;
        case 'desserts':
            window.location.href = 'desserts.html';
            break;
        default:
            alert('Category not available.');
    }
}
// Navigation functions
function goToManagerDashboard() {
    window.location.href = 'managerDashboard.html';
}

function goToAccountInfo() {
    window.location.href = 'accountInfo.html';
}

n
function logout() {
    localStorage.removeItem('token');
    alert('You have successfully logged out.');
    window.location.href = 'home.html';
}


function goToHome() {
    window.location.href = 'home.html';
}
