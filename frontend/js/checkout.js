document.addEventListener('DOMContentLoaded', () => {
    const paymentMethods = document.getElementsByName('paymentMethod');
    const creditCardDetails = document.getElementById('creditCardDetails');
    const giftCardDetails = document.getElementById('giftCardDetails');
    const mobilePaymentDetails = document.getElementById('mobilePaymentDetails');
    const confirmationSection = document.querySelector('.confirmation');
    const summaryList = document.getElementById('summaryList');
    const totalPriceEl = document.getElementById('totalPrice');

    let cart = []; // Mock data; this will be replaced with fetched cart data
    let totalPrice = 0;

    // Fetch cart data dynamically
    fetch('http://localhost:3000/api/cart')
        .then(response => response.json())
        .then(data => {
            cart = data;
            renderCartSummary(cart);
        })
        .catch(err => console.error('Error fetching cart data:', err));

    // Listen for payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('change', () => {
            creditCardDetails.classList.add('d-none');
            giftCardDetails.classList.add('d-none');
            mobilePaymentDetails.classList.add('d-none');

            if (method.id === 'creditCard') {
                creditCardDetails.classList.remove('d-none');
            } else if (method.id === 'giftCard') {
                giftCardDetails.classList.remove('d-none');
            } else if (method.id === 'mobilePayment') {
                mobilePaymentDetails.classList.remove('d-none');
            }
        });
    });

    // Render the cart summary
    function renderCartSummary(cartItems) {
        summaryList.innerHTML = ''; // Clear existing summary
        totalPrice = 0;

        cartItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.itemName} (x${item.quantity}) - $${(item.cost * item.quantity).toFixed(2)}`;
            summaryList.appendChild(listItem);

            totalPrice += item.cost * item.quantity;
        });

        totalPriceEl.textContent = totalPrice.toFixed(2);
    }

    // Cancel order functionality
    window.cancelOrder = () => {
        if (confirm('Are you sure you want to cancel the order?')) {
            window.location.href = 'cart.html';
        }
    };

    // Submit payment functionality
    window.submitPayment = () => {
        const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
        if (!selectedMethod) {
            alert('Please select a payment method.');
            return;
        }

        if (selectedMethod.id === 'creditCard') {
            const cardNumber = document.getElementById('cardNumber').value.trim();
            const expiryDate = document.getElementById('expiryDate').value.trim();
            const cvv = document.getElementById('cvv').value.trim();
            const billingAddress = document.getElementById('billingAddress').value.trim();

            if (!cardNumber || !expiryDate || !cvv || !billingAddress) {
                alert('Please fill out all card details.');
                return;
            }
        } else if (selectedMethod.id === 'giftCard') {
            const giftCardNumber = document.getElementById('giftCardNumber').value.trim();
            if (!giftCardNumber) {
                alert('Please enter your gift card number.');
                return;
            }
        }

        alert('Processing payment...');
        confirmationSection.classList.remove('d-none');
    };

    // Hamburger Menu Toggle
    window.toggleMenu = () => {
        const menu = document.getElementById('hamburgerMenu');
        menu.classList.toggle('d-none');
        menu.classList.toggle('d-block');
    };

    // Account Info and Logout Functions
    window.goToAccountInfo = () => {
        window.location.href = 'accountInfo.html';
    };

    window.logout = () => {
        localStorage.removeItem('token');
        alert('You have successfully logged out.');
        window.location.href = 'home.html';
    };

    window.goToHome = () => {
        window.location.href = 'home.html';
    };
});
