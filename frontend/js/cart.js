document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You must be logged in to view your cart.');
        window.location.href = 'login.html';
        return;
    }

    // Fetch cart items when the page loads
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
function proceedToCheckout() {
    alert('Proceeding to checkout...');
    // Redirect or implement checkout logic
    window.location.href = 'checkout.html';
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
    alert('You have successfully logged out.');
    window.location.href = 'home.html';
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
