document.addEventListener('DOMContentLoaded', () => {
    const orderDetailsEl = document.getElementById('orderDetails');
    const totalCostEl = document.getElementById('totalCost');
    const paymentInfoEl = document.getElementById('paymentInfo');
    const orderArrivalEl = document.getElementById('orderArrival');

    // Mock data retrieval (replace with real API call if needed)
    const orderData = JSON.parse(localStorage.getItem('orderData')) || {
        items: [
            { name: "1x Large Pizza", details: ["Thin Crust", "Marinara Sauce", "Regular Cheese"], price: 20.0 },
            { name: "2x Garlic Knots", details: [], price: 7.0 },
            { name: "1x Large Drink", details: ["Pepsi"], price: 2.99 }
        ],
        totalCost: 66.86,
        paymentInfo: "Paid with Card | Last Four Digits: xxxx8390",
        estimatedArrival: "8:32 PM"
    };

    // Render order details
    orderData.items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${item.name} - $${item.price.toFixed(2)}</strong>
            ${item.details.length > 0 ? `<ul>${item.details.map(detail => `<li>${detail}</li>`).join('')}</ul>` : ''}
        `;
        orderDetailsEl.appendChild(listItem);
    });

    // Render summary info
    totalCostEl.textContent = orderData.totalCost.toFixed(2);
    paymentInfoEl.textContent = orderData.paymentInfo;
    orderArrivalEl.textContent = orderData.estimatedArrival;

    // Handle navigation
    window.goToHome = () => {
        window.location.href = "home.html";
    };

    window.logout = () => {
        localStorage.removeItem('token');
        alert('You have successfully logged out.');
        window.location.href = "home.html";
    };

    window.goToAccountInfo = () => {
        window.location.href = "accountInfo.html";
    };

    window.toggleMenu = () => {
        const menu = document.getElementById("hamburgerMenu");
        menu.classList.toggle("d-none");
        menu.classList.toggle("d-block");
    };
});
