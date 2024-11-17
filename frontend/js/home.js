// home.js
document.addEventListener('DOMContentLoaded', () => {
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
// Function to navigate to the menu page
function navigateToMenu() {
    window.location.href = 'menu.html';
}
// Function to navigate to the sides page
function navigateToSides() {
    window.location.href = 'sides.html';
}


// Function to toggle the hamburger menu
function toggleMenu() {
    const menu = document.getElementById("hamburgerMenu");
    menu.classList.toggle("d-none");
    menu.classList.toggle("d-block");
}

