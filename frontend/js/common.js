// common.js - Adjusts navigation links based on user login status

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (token) {
        // User is logged in
        const headerRight = document.querySelector('.header-right');
        headerRight.innerHTML += `
            <button class="btn btn-light" onclick="logout()">
                <img src="../assets/icons/logout-icon.png" alt="Logout" width="24"> Logout
            </button>
        `;
    }
    else {
        // User is not logged in
        headerRight.innerHTML += `
            <button class="btn btn-warning me-3" onclick="goToLogin()">Login/Create Account</button>
        `;
    }


    // Initialize the hamburger menu
    initializeHamburgerMenu(token);
});

// Logout function
function logout() {
    localStorage.removeItem('token');
    alert('You have successfully logged out.');
    window.location.href = 'home.html';
}

// Function to navigate to Account Info
function goToAccountInfo() {
    window.location.href = 'accountInfo.html';
}

// Function to navigate to Home
function goToHome() {
    window.location.href = 'home.html';
}

// Function to navigate to Login page
function goToLogin() {
    window.location.href = 'login.html';
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
