document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please log in to view your order summary.');
        window.location.href = 'login.html';
        return;
    }

    fetchOrderSummary();
});

// Fetch the order summary grouped by item type
async function fetchOrderSummary() {
    const customerId = localStorage.getItem('customerId');

    try {
        const response = await fetch(`http://localhost:3000/api/cart?customerId=${customerId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        if (!response.ok) throw new Error('Failed to fetch order summary.');

        const orderItems = await response.json();
        groupAndRenderOrderItems(orderItems);
    } catch (error) {
        console.error('Error fetching order summary:', error);
        alert('Could not load your order summary.');
    }
}

// Group and render items by category
function groupAndRenderOrderItems(items) {
    const groupedItems = groupItemsByType(items);
    const orderDetails = document.getElementById('orderDetails');
    orderDetails.innerHTML = '';

    let totalPrice = 0;

    for (const [category, categoryItems] of Object.entries(groupedItems)) {
        const categoryHeader = document.createElement('h5');
        categoryHeader.textContent = category;
        categoryHeader.classList.add('group-header');
        orderDetails.appendChild(categoryHeader);

        categoryItems.forEach((item) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('order-item');
            itemElement.innerHTML = `
                <span>${item.Quantity}x ${item.ItemName}</span>
                <span>$${(item.Quantity * item.Cost).toFixed(2)}</span>
            `;
            orderDetails.appendChild(itemElement);

            totalPrice += item.Quantity * item.Cost;
        });
    }

    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
    document.getElementById('paymentInfo').textContent = 'Paid with Card | Last Four Digits: xxxx8390';
    document.getElementById('estimatedArrival').textContent = '8:32 p.m.';
}

// Group items by their type
function groupItemsByType(items) {
    return items.reduce((groups, item) => {
        if (!groups[item.ItemType]) {
            groups[item.ItemType] = [];
        }
        groups[item.ItemType].push(item);
        return groups;
    }, {});
}

// Utility functions
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

function toggleMenu() {
    const menu = document.getElementById('hamburgerMenu');
    menu.classList.toggle('d-none');
    menu.classList.toggle('d-block');

    // Close menu if clicked outside
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && e.target !== document.querySelector('.hamburger-container button')) {
            menu.classList.add('d-none');
        }
    });
}
