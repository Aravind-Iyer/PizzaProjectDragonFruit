// common.js - Adjusts navigation links based on user login status
// only one page uses this too lazy to switch so w.e use if u want but yeah
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const isManager = localStorage.getItem('isManager') === 'true';

    const headerRight = document.querySelector('.header-right');
    if (token) {

        headerRight.innerHTML = `
            ${isManager ? `<button class="btn btn-danger ms-2" onclick="goToManagerDashboard()">Manager Dashboard</button>` : ''}
            <button class="btn btn-light me-3" onclick="goToAccountInfo()">Account Info</button>
            <button class="btn btn-warning" onclick="logout()">Logout</button>
            
        `;

        // Show the hamburger menu button for logged-in users
        const hamburgerContainer = document.querySelector('.hamburger-container');
        if (hamburgerContainer) {
            hamburgerContainer.style.display = 'block';
        }

    } else {

        headerRight.innerHTML = `
            <button class="btn btn-light" onclick="goToLogin()">Login/Create Account</button>
        `;

        // Hide the hamburger menu button for non-logged-in users
        const hamburgerContainer = document.querySelector('.hamburger-container');
        if (hamburgerContainer) {
            hamburgerContainer.style.display = 'none';
        }
    }

    // Initialize the hamburger menu
    initializeHamburgerMenu(token);


    document.addEventListener('click', (event) => {
        const menu = document.getElementById('hamburgerMenu');
        const button = document.querySelector('.hamburger-container button');
        if (menu && !menu.contains(event.target) && !button.contains(event.target)) {
            closeMenu(); // Close the menu if clicking outside
        }
    });
});


function goToHome() {
    window.location.href = 'home.html';
}


function goToLogin() {
    window.location.href = 'login.html';
}


function goToAccountInfo() {
    window.location.href = 'accountInfo.html';
}

function goToManagerDashboard() {
    window.location.href = 'managerDashboard.html';
}

function logout() {
    localStorage.removeItem('token');
    alert('You have successfully logged out.');
    window.location.href = 'home.html';
}


function toggleMenu() {
    console.log("Hamburger menu button clicked"); // Debug message
    const menu = document.getElementById('hamburgerMenu');
    if (menu) {
        const isMenuHidden = menu.classList.contains('d-none');
        menu.classList.toggle('d-none', !isMenuHidden);
        menu.classList.toggle('d-block', isMenuHidden);
    }
}


function closeMenu() {
    const menu = document.getElementById('hamburgerMenu');
    if (menu) {
        menu.classList.add('d-none');
        menu.classList.remove('d-block');
    }
}


function initializeHamburgerMenu(token) {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    if (!hamburgerMenu) return;

    let menuItems = `
        <li><a href="menu.html">Menu</a></li>
        <li><a href="cart.html">Cart</a></li>
        <li><a href="accountInfo.html">Account Info</a></li>
    `;

    hamburgerMenu.innerHTML = `<ul>${menuItems}</ul>`;
}
