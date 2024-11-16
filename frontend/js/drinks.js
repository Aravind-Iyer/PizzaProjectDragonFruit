drinks.cssdocument.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    // Account Info and Logout Button Setup
    const accountInfoButton = document.querySelector('.header-right button:first-child');
    const logoutButton = document.querySelector('.header-right button.btn-warning');

    if (token) {
        accountInfoButton.style.display = 'inline-block';
        logoutButton.style.display = 'inline-block';
    } else {
        accountInfoButton.style.display = 'none';
        logoutButton.style.display = 'none';
    }

    // Fetch drink data dynamically from backend
    try {
        const response = await fetch('http://localhost:3000/api/drinks', {
            headers: { Authorization: `Bearer ${token}` }
        });

        // If the response is not OK, log the status and the error message
        if (!response.ok) {
            console.error('Error in response:');
            console.error('Status:', response.status);
            console.error('Response Text:', await response.text());
            throw new Error('Failed to fetch drinks.');
        }

        const drinks = await response.json();
        console.log('Fetched Drinks:', drinks); // Log the fetched data
        updateDrinkPlaceholders(drinks);
    } catch (error) {
        console.error('Fetch error:', error); // Log the full error in the console
        alert('Could not load drinks. Please try again later.');
    }

});

// Update placeholders with dynamic data
function updateDrinkPlaceholders(drinks) {
    drinks.forEach((drink, index) => {
        const drinkCard = document.getElementById(`drink-${index + 1}`);
        if (drinkCard) {
            drinkCard.querySelector('img').src = drink.ImageURL; // Use ImageURL
            drinkCard.querySelector('h3').textContent = drink.DrinkName; // Use DrinkName
            drinkCard.querySelector(`#price-${index + 1}`).textContent = `$${drink.Cost.toFixed(2)}`; // Use Cost
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
function addToCart(drinkId) {
    const quantity = document.querySelector(`#quantity-${drinkId}`).value;
    alert(`Added ${quantity} of Drink ${drinkId} to cart!`);
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
