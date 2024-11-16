// Account Info and Logout Button Setup
const accountInfoButton = document.querySelector('.header-right button:first-child');
const logoutButton = document.querySelector('.header-right button.btn-warning');

accountInfoButton.style.display = 'inline-block';
logoutButton.style.display = 'inline-block';

// Update placeholders with dynamic data
function updateSidesPlaceholders(sides) {
    sides.forEach((sides, index) => {
        const sidesCard = document.getElementById(`dessert-${index + 1}`);
        if (sidesCard) {
            sidesCard.querySelector('img').src = sides.ImageURL;
            sidesCard.querySelector('h3').textContent = sides.sidesName;
            sidesCard.querySelector(`#price-${index + 1}`).textContent = `$${sides.Cost.toFixed(2)}`;
            sidesCard.querySelector('button').setAttribute(
                'onclick',
                `addToCart(${sides.SidesID}, '${sides.SidesName}')`
            );
        }
    });
}

// Hamburger menu toggle
function toggleMenu() {
    const menu = document.getElementById("hamburgerMenu");
    menu.classList.toggle("d-none");
    menu.classList.toggle("d-block");
}

// Placeholder Add to Cart Function
function addToCart(sidesID, sidesName) {
    const quantityInput = document.querySelector(`#quantity-${sidesID}`);
    const quantity = parseInt(quantityInput.value, 10);

    if (isNaN(quantity) || quantity <= 0) {
        alert('Please enter a valid quantity.');
        return;
    }

    if (quantity > 5) {
        alert(`You can only add up to 5 of ${sidesName}.`);
        quantityInput.value = 5; // Reset quantity to the maximum allowed
        return;
    }

    alert(`Added ${quantity} of ${sidesName} to cart!`);
}


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
