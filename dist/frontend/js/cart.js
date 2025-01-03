document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You must be logged in to view your cart.');
        window.location.href = 'login.html';
        return;
    }

    const isManager = localStorage.getItem('isManager') === 'true';

    // Get buttons by their IDs
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

    fetchCart();
});

// Fetch cart items from the backend
async function fetchCart() {
    const customerId = parseInt(localStorage.getItem('customerId'));

    try {
        const response = await fetch(`http://localhost:3000/api/cart?customerId=${customerId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (!response.ok) throw new Error('Failed to fetch cart items.');

        const cartItems = await response.json();
        renderCartItems(cartItems);
    } catch (error) {
        console.error('Error fetching cart:', error);
        alert('Could not load cart items.');
    }
}

// Render cart items to the page
function renderCartItems(cartItems) {
    const orderItemsContainer = document.querySelector('.order-items');
    orderItemsContainer.innerHTML = ''; // Clear existing items
    let totalPrice = 0;

    cartItems.forEach((item) => {
        const itemTotal = item.Quantity * item.Cost;
        totalPrice += itemTotal;

        const itemElement = `
            <div class="order-item d-flex justify-content-between align-items-center p-2">
                <span>${item.ItemName}</span>
                <div class="d-flex gap-2 align-items-center">
                    <button class="btn btn-sm btn-light" onclick="updateCart(${item.CartID}, ${item.Quantity - 1})">-</button>
                    <span>${item.Quantity}</span>
                    <button class="btn btn-sm btn-light" onclick="updateCart(${item.CartID}, ${item.Quantity + 1})">+</button>
                </div>
                <span>$${itemTotal.toFixed(2)}</span>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.CartID})">Remove</button>
            </div>
        `;
        orderItemsContainer.innerHTML += itemElement;
    });

    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
}

// Update cart item quantity
async function updateCart(cartId, newQuantity) {
    if (newQuantity < 1) {
        alert('Quantity must be at least 1.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/cart', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cartId, quantity: newQuantity })
        });
        if (!response.ok) throw new Error('Failed to update cart item.');

        fetchCart(); // Refresh cart
    } catch (error) {
        console.error('Error updating cart:', error);
        alert('Could not update cart item.');
    }
}

// Remove an item from the cart
async function removeFromCart(cartId) {
    try {
        const response = await fetch('http://localhost:3000/api/cart', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cartId })
        });
        if (!response.ok) throw new Error('Failed to remove cart item.');

        fetchCart(); // Refresh cart
    } catch (error) {
        console.error('Error removing from cart:', error);
        alert('Could not remove cart item.');
    }
}

// Proceed to checkout
async function proceedToCheckout() {
    const customerId = parseInt(localStorage.getItem('customerId'));

    try {
        // Fetch cart items to ensure we have the latest data
        const response = await fetch(`http://localhost:3000/api/cart?customerId=${customerId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (!response.ok) throw new Error('Failed to fetch cart items.');

        const cartItems = await response.json();


        if (cartItems.length === 0) {
            alert('Your cart is empty. Please add items to your cart before proceeding to checkout.');
            return;
        }


        alert('Proceeding to checkout...');
        window.location.href = 'checkout.html';
    } catch (error) {
        console.error('Error during cart check for checkout:', error);
        alert('Could not verify cart items before checkout. Please try again.');
    }
}

// Cancel order and redirect to menu
async function cancelOrder() {
    const customerId = parseInt(localStorage.getItem('customerId')); // Use dynamic customer ID from localStorage
    if (!customerId) {
        alert('Unable to cancel order. Customer ID not found.');
        return;
    }

    if (confirm('Are you sure you want to cancel your order? This will clear your cart.')) {
        try {
            const response = await fetch('http://localhost:3000/api/cart/clear', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customerId })
            });

            if (!response.ok) {
                throw new Error('Failed to clear cart.');
            }

            alert('Order cancelled. Your cart has been cleared.');
            fetchCart(); // Refresh the cart to show it's empty
        } catch (error) {
            console.error('Error cancelling order:', error);
            alert('Could not cancel order. Please try again.');
        }
    }
}



// Redirect to account information page
function goToAccountInfo() {
    window.location.href = 'accountInfo.html';
}

// Logout the user and clear token
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isManager');
    localStorage.removeItem('customerId');
    alert('You have successfully logged out.');
    window.location.href = 'home.html';
}
function goToManagerDashboard() {
    window.location.href = 'managerDashboard.html';
}

// Redirect to home page
function goToHome() {
    window.location.href = 'home.html';
}

// Toggle the hamburger menu
function toggleMenu() {
    const menu = document.getElementById("hamburgerMenu");
    menu.classList.toggle("d-none");
    menu.classList.toggle("d-block");
}
