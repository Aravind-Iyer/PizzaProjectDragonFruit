document.addEventListener('DOMContentLoaded', () => {
    const paymentMethods = document.getElementsByName('paymentMethod');
    const creditCardDetails = document.getElementById('creditCardDetails');
    const giftCardDetails = document.getElementById('giftCardDetails');
    const mobilePaymentDetails = document.getElementById('mobilePaymentDetails');
    const confirmationSection = document.querySelector('.confirmation');
    const summaryList = document.getElementById('summaryList');
    const totalPriceEl = document.getElementById('totalPrice');

    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve cart from localStorage
    let totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0; // Retrieve total price from localStorage
    const customerId = parseInt(localStorage.getItem('customerId'));

    // Fetch cart data dynamically
    fetch(`http://localhost:3000/api/cart?customerId=${customerId}`) // Use the correct customerId
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch cart items'); // Handle errors
            return response.json();
        })
        .then(data => {
            cart = data; // Store fetched cart data
            console.log('Cart fetched successfully:', cart); // Debug - Log fetched cart
            renderCartSummary(cart); // Render the cart summary
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
        summaryList.innerHTML = ''; // Clear the summary section
        totalPrice = 0; // Reset total price

        cartItems.forEach(item => {
            console.log('Rendering item:', item); // Debug - Log each item in the cart
            const listItem = document.createElement('li');
            listItem.textContent = `${item.ItemName} (x${item.Quantity}) - $${(item.Quantity * item.Cost).toFixed(2)}`;
            summaryList.appendChild(listItem);

            totalPrice += item.Quantity * item.Cost; // Accumulate the total price
        });

        console.log('Total Price:', totalPrice); // Debug - Log calculated total price
        totalPriceEl.textContent = totalPrice.toFixed(2); // Update the total price in the DOM
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

        const paymentData = {
            customerId, // Customer ID
            paymentMethod: selectedMethod.value, // Selected payment method
            cartItems: cart, // Cart data (item details)
            totalPrice, // Total price of the cart
        };

        // Handle credit card details if selected
        if (selectedMethod.id === 'creditCard') {
            const cardNumber = document.getElementById('cardNumber').value.trim();
            const expiryDate = document.getElementById('expiryDate').value.trim();
            const cvv = document.getElementById('cvv').value.trim();
            const billingAddress = document.getElementById('billingAddress').value.trim();

            if (!cardNumber || cardNumber.length !== 16 || isNaN(cardNumber)) {
                alert('Please enter a valid 16-digit card number.');
                return;
            }
            if (!expiryDate || !cvv || cvv.length !== 3 || isNaN(cvv)) {
                alert('Please provide a valid expiry date and CVV.');
                return;
            }
            if (!billingAddress) {
                alert('Please provide your billing address.');
                return;
            }

            paymentData.cardNumber = cardNumber;
            paymentData.expiryDate = expiryDate;
            paymentData.cvv = cvv;
            paymentData.billingAddress = billingAddress;
        } else if (selectedMethod.id === 'giftCard') {
            const giftCardNumber = document.getElementById('giftCardNumber').value.trim();
            if (!giftCardNumber) {
                alert('Please enter your gift card number.');
                return;
            }
            paymentData.giftCardNumber = giftCardNumber;
        }

        console.log('Payment payload:', paymentData); // Debug - Log the payment payload
        alert('Processing payment...');
        fetch('http://localhost:3000/api/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Payment processing failed.');
                }
                return response.json();
            })
            .then(data => {
                confirmationSection.classList.remove('d-none');
                alert('Payment successful! Payment ID: ' + data.paymentId);

                // Clear local storage and redirect
                localStorage.removeItem('cart');
                localStorage.removeItem('totalPrice');

                fetch(`http://localhost:3000/api/cart/clear`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ customerId }),
                })
                    .then(response => {
                        if (!response.ok) {
                            console.error('Failed to clear cart:', response);
                        }
                        window.location.href = 'orderSummary.html'; // Redirect after clearing the cart
                    })
                    .catch(err => console.error('Error clearing cart:', err));
            })
            .catch(err => {
                console.error('Error submitting payment:', err);
                alert('Failed to process payment. Please try again.');
            });
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
