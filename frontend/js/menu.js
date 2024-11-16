// menu.js
// Immediate authentication check before page rendering
if (!localStorage.getItem('token')) {
    alert('You must be logged in to access the menu.');
    window.location.href = 'login.html'; // Redirect to login page
}

// menu.js

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    const accountInfoButton = document.querySelector('.header-right button:first-child'); // Account Info button
    const logoutButton = document.querySelector('.header-right button.btn-warning'); // Logout button

    if (token) {
        // Show "Account Info" and "Logout" buttons if logged in
        accountInfoButton.style.display = 'inline-block';
        logoutButton.style.display = 'inline-block';
    } else {
        // Hide buttons (extra safety check)
        accountInfoButton.style.display = 'none';
        logoutButton.style.display = 'none';
    }
});

// Function to toggle the hamburger menu
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

// Placeholder function for navigating to the account info page
function goToAccountInfo() {
    window.location.href = 'accountInfo.html';
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    alert('You have successfully logged out.');
    window.location.href = 'home.html';
}

// Placeholder function for navigating back to the homepage
function goToHome() {
    window.location.href = 'home.html';
}
