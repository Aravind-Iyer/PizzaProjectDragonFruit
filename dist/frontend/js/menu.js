if (!localStorage.getItem('token')) {
    alert('You must be logged in to access the menu.');
    window.location.href = 'login.html'; // Redirect to login page
}



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
    const cartButton = document.querySelector('.go-to-cart-button');

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemCount = cart.reduce((total, item) => total + item.Quantity, 0);

    if (itemCount > 0) {
        cartButton.textContent = `🛒 Go to Cart (${itemCount})`;
    } else {
        cartButton.textContent = `🛒 Go to Cart`;
    }
});


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

n
function logout() {
    localStorage.removeItem('token');
    alert('You have successfully logged out.');
    window.location.href = 'home.html';
}


function goToHome() {
    window.location.href = 'home.html';
}
