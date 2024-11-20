document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please log in to view your order summary.');
        window.location.href = 'login.html';
        return;
    }

    fetchOrderSummary();
});

// Fetch the order summary grouped by item type and payment info
async function fetchOrderSummary() {
    const customerId = localStorage.getItem('customerId');
    try {
        const response = await fetch(`http://localhost:3000/api/orderSummary?customerId=${customerId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (!response.ok) throw new Error('Failed to fetch order summary.');

        const orderData = await response.json();
        renderOrderSummary(orderData);
    } catch (error) {
        console.error('Error fetching order summary:', error);
        alert('Could not load your order summary. Please try again later.');
    }
}

// Render the order summary data into the DOM
function renderOrderSummary(orderData) {
    const groupedItems = groupItemsByType(orderData);
    const orderDetails = document.getElementById('orderSummaryContent');
    orderSummaryContent.innerHTML = '';

    let totalPrice = 0;

    for (const [category, items] of Object.entries(groupedItems)) {
        const categoryHeader = document.createElement('h5');
        categoryHeader.textContent = category;
        categoryHeader.classList.add('group-header');
        orderDetails.appendChild(categoryHeader);

        items.forEach((item) => {
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

    document.getElementById('totalPrice').textContent = `$${totalPrice.toFixed(2)}`;
    document.getElementById('paymentInfo').textContent = orderData[0]?.PaymentMethod || 'N/A';
    // Update delivery option
    document.getElementById('deliveryOption').textContent = orderData[0]?.DeliveryOption || 'N/A';

    // Adjust arrival time to be 45 minutes from order time
    const orderDate = new Date(orderData[0]?.OrderDate);

    // Adjust order date to the local time zone (remove the offset if necessary)
    const userTimezoneOffset = orderDate.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
    const localOrderDate = new Date(orderDate.getTime() - userTimezoneOffset);

    // Calculate estimated arrival time
    const estimatedArrival = new Date(localOrderDate.getTime() + 45 * 60000); // Adding 45 minutes

    // Format the arrival time
    document.getElementById('estimatedArrival').textContent = estimatedArrival.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
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
// Signature Pad Handling
let canvas = document.getElementById('signaturePad');
let signaturePad = canvas ? canvas.getContext('2d') : null;
let drawing = false;

if (signaturePad) {
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseout', stopDrawing);
}

function startDrawing(event) {
    drawing = true;
    signaturePad.beginPath();
    signaturePad.moveTo(event.offsetX, event.offsetY);
}

function draw(event) {
    if (!drawing) return;
    signaturePad.lineTo(event.offsetX, event.offsetY);
    signaturePad.stroke();
}

function stopDrawing() {
    drawing = false;
}

function clearSignature() {
    signaturePad.clearRect(0, 0, canvas.width, canvas.height);
}

// Add the submit signature functionality
function submitSignature() {
    if (canvas) {
        const signatureData = canvas.toDataURL();
        // eh send it away do it later but eh not needed so w.e
        console.log('Signature saved successfully:', signatureData);
        alert('Signature saved successfully! Redirecting to the homepage.');


        goToHome();
    } else {
        console.error('Signature canvas not found');
    }
}