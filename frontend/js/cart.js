document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You must be logged in to view your cart.');
        window.location.href = 'login.html';
    }

    try {
        // Fetch cart items dynamically from the backend
        const response = await fetch('http://localhost:3000/api/cart', {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error('Failed to fetch cart items.');

        const cartItems = await response.json();
        renderCartItems(cartItems);
    } catch (error) {
        console.error('Error:', error);
        alert('Could not load cart items.');
    }
});

function renderCartItems(cartItems) {
    const orderItemsContainer = document.querySelector('.order-items');
    let totalPrice = 0;

    cartItems.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const itemElement = `
            <div class="order-item">
                <span>${item.name}</span>
                <span>Qty: ${item.quantity}</span>
                <span>Price: $${item.price.toFixed(2)}</span>
            </div>
        `;
        orderItemsContainer.innerHTML += itemElement;
    });

    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
}

function cancelOrder() {
    if (confirm('Are you sure you want to cancel your order?')) {
        alert('Order cancelled.');
        window.location.href = 'menu.html';
    }
}

function proceedToCheckout() {
    alert('Proceeding to checkout...');
    window.location.href = 'checkout.html';
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
