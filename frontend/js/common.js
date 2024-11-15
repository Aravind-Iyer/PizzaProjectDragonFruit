// common.js - Adjusts navigation links based on user login status

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    const headerRight = document.querySelector('.header-right');
    if (token) {
        // User is logged in - Show logout and account info button
        headerRight.innerHTML = `
            <button class="btn btn-light me-3" onclick="goToAccountInfo()">Account Info</button>
            <button class="btn btn-warning" onclick="logout()">Logout</button>
        `;
    } else {
        // User is not logged in - Show Login/Create Account button
        headerRight.innerHTML = `
            <button class="btn btn-light" onclick="goToLogin()">Login/Create Account</button>
        `;
    }

    // Initialize the hamburger menu
    initializeHamburgerMenu(token);
});

// Function to navigate to Home
function goToHome() {
    window.location.href = 'home.html';
}

// Function to navigate to Login page
function goToLogin() {
    window.location.href = 'login.html';
}

// Function to navigate to Account Info page
function goToAccountInfo() {
    window.location.href = 'accountInfo.html';
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    alert('You have successfully logged out.');
    window.location.href = 'home.html';
}

// Toggle the hamburger menu visibility
function toggleMenu() {
    const menu = document.getElementById('hamburgerMenu');
    if (menu) {
        menu.classList.toggle('d-none');
        menu.classList.toggle('d-block');
    }
}

// Initialize Hamburger Menu Based on User Authentication State
function initializeHamburgerMenu(token) {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    if (!hamburgerMenu) return;

    let menuItems = `
        <li><a href="order.html">Place Order</a></li>
        <li><a href="accountInfo.html">Account Info</a></li>
        <li><a href="cart.html">Cart</a></li>
    `;

    hamburgerMenu.innerHTML = `<ul>${menuItems}</ul>`;
}
