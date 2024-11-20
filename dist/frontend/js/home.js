
document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.querySelector('.go-to-cart-button');


    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemCount = cart.reduce((total, item) => total + item.Quantity, 0);


    if (itemCount > 0) {
        cartButton.textContent = `🛒 Go to Cart (${itemCount})`;
    } else {
        cartButton.textContent = `🛒 Go to Cart`;
    }
});

function navigateToMenu() {
    window.location.href = 'menu.html';
}

function navigateToSides() {
    window.location.href = 'sides.html';
}



function toggleMenu() {
    const menu = document.getElementById("hamburgerMenu");
    menu.classList.toggle("d-none");
    menu.classList.toggle("d-block");
}

