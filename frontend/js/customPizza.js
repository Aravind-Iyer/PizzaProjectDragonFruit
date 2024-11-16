// customPizza.js

document.getElementById('nextBtn').addEventListener('click', () => {
    // Hide base section, show toppings section
    document.getElementById('pizzaBaseSection').classList.add('d-none');
    document.getElementById('pizzaToppingsSection').classList.remove('d-none');
});

document.getElementById('addToCartBtn').addEventListener('click', () => {
    alert('Pizza added to cart!'); // Placeholder for backend connection
});
