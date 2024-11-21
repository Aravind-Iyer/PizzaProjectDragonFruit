if (!localStorage.getItem('token')) {
    alert('You must be logged in to access the menu.');
    window.location.href = 'login.html'; // Redirect to login page
}



document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const isManager = localStorage.getItem('isManager') === 'true';

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

    // Update cart button content
    const cartButton = document.querySelector('.go-to-cart-button');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemCount = cart.reduce((total, item) => total + item.Quantity, 0);

    if (itemCount > 0) {
        cartButton.textContent = `🛒 Go to Cart (${itemCount})`;
    } else {
        cartButton.textContent = `🛒 Go to Cart`;
    }
});

function goToManagerDashboard() {
    window.location.href = 'managerDashboard.html';
}
window.toggleMenu = () => {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    if (hamburgerMenu) {
        hamburgerMenu.classList.toggle('d-none');
    } else {
        console.error('Hamburger menu element not found!');
    }
};

document.addEventListener('click', (event) => {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const hamburgerButton = document.querySelector('.hamburger-button');

    if (!hamburgerMenu || !hamburgerButton) {
        console.error('Hamburger menu or button element not found!');
        return;
    }

    const isClickInsideMenu = hamburgerMenu.contains(event.target);
    const isClickOnButton = hamburgerButton.contains(event.target);

    console.log('Clicked outside hamburger menu:', !isClickInsideMenu && !isClickOnButton);

    if (!isClickInsideMenu && !isClickOnButton && !hamburgerMenu.classList.contains('d-none')) {
        hamburgerMenu.classList.add('d-none');
    }
});

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


function goToAccountInfo() {
    window.location.href = 'accountInfo.html';
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isManager');
    localStorage.removeItem('customerId');
    alert('You have successfully logged out.');
    window.location.href = 'home.html';
}


function goToHome() {
    window.location.href = 'home.html';
}
