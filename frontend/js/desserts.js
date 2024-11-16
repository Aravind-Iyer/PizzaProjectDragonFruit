document.addEventListener('DOMContentLoaded', async () => {
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

    // Fetch dessert data dynamically from backend
    try {
        const response = await fetch('http://localhost:3000/api/desserts', {
            headers: { Authorization: `Bearer ${token}` }
        });

        // If the response is not OK, log the status and the error message
        if (!response.ok) {
            console.error('Error in response:');
            console.error('Status:', response.status);
            console.error('Response Text:', await response.text());
            throw new Error('Failed to fetch desserts.');
        }

        const desserts = await response.json();
        console.log('Fetched Desserts:', desserts); // Log the fetched data
        updateDessertPlaceholders(desserts);
    } catch (error) {
        console.error('Fetch error:', error); // Log the full error in the console
        alert('Could not load desserts. Please try again later.');
    }

});

// Update placeholders with dynamic data
function updateDessertPlaceholders(desserts) {
    desserts.forEach((dessert, index) => {
        const dessertCard = document.getElementById(`dessert-${index + 1}`);
        if (dessertCard) {
            dessertCard.querySelector('img').src = dessert.ImageURL; // Use ImageURL
            dessertCard.querySelector('h3').textContent = dessert.DessertName; // Use DessertName
            dessertCard.querySelector(`#price-${index + 1}`).textContent = `$${dessert.Cost.toFixed(2)}`; // Use Cost
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
function addToCart(dessertId) {
    const quantity = document.querySelector(`#quantity-${dessertId}`).value;
    alert(`Added ${quantity} of Dessert ${dessertId} to cart!`);
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
