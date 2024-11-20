if (!localStorage.getItem('token')) {
    alert('You must be logged in to access the menu.');
    window.location.href = 'login.html';
}
document.addEventListener('DOMContentLoaded', () => {
    const paymentMethods = document.getElementsByName('paymentMethod');
    const creditCardDetails = document.getElementById('creditCardDetails');
    const giftCardDetails = document.getElementById('giftCardDetails');
    const mobilePaymentDetails = document.getElementById('mobilePaymentDetails');
    const confirmationSection = document.querySelector('.confirmation');
    const summaryList = document.getElementById('summaryList');
    const totalPriceEl = document.getElementById('totalPrice');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;
    const customerId = parseInt(localStorage.getItem('customerId'));
    const token = localStorage.getItem('token');

    // Fetch cart data dynamically
    fetch(`http://localhost:3000/api/cart?customerId=${customerId}`)
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch cart items');
            return response.json();
        })
        .then(data => {
            cart = data; // Store fetched cart data
            console.log('Cart fetched successfully:', cart);
            renderCartSummary(cart);
        })
        .catch(err => console.error('Error fetching cart data:', err));

    // Listen for payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('change', async () => {
            creditCardDetails.classList.add('d-none');
            giftCardDetails.classList.add('d-none');
            mobilePaymentDetails.classList.add('d-none');

            if (method.id === 'creditCard') {
                creditCardDetails.classList.remove('d-none');


                if (token) {
                    try {
                        const response = await  fetch('http://localhost:3000/api/account-info', {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            }
                        });

                        if (response.ok) {
                            const data = await response.json();
                            document.getElementById('cardNumber').value = data.cardNumber || '';
                            document.getElementById('expiryDate').value = data.cardExpiry || '';
                            document.getElementById('cvv').value = data.cardCVV || '';
                            document.getElementById('billingAddress').value = data.address || '';
                        } else {
                            console.error('Failed to fetch account info for autofill.');
                        }
                    } catch (error) {
                        console.error('Error fetching account info:', error);
                    }
                }
            } else if (method.id === 'giftCard') {
                giftCardDetails.classList.remove('d-none');
            } else if (method.id === 'mobilePayment') {
                mobilePaymentDetails.classList.remove('d-none');
            }
        });
    });

    // Render the cart summary
    function renderCartSummary(cartItems) {
        summaryList.innerHTML = '';
        totalPrice = 0;

        cartItems.forEach(item => {
            console.log('Rendering item:', item);
            const listItem = document.createElement('li');
            listItem.textContent = `${item.ItemName} (x${item.Quantity}) - $${(item.Quantity * item.Cost).toFixed(2)}`;
            summaryList.appendChild(listItem);

            totalPrice += item.Quantity * item.Cost;
        });

        console.log('Total Price:', totalPrice);
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
        const selectedDeliveryOption = document.querySelector('input[name="deliveryOption"]:checked');
        if (!selectedDeliveryOption) {
            alert('Please select a delivery option.');
            return;
        }
        if (!selectedMethod) {
            alert('Please select a payment method.');
            return;
        }

        const paymentData = {
            customerId,
            paymentMethod: selectedMethod.value,
            deliveryOption: selectedDeliveryOption.value,
            cartItems: cart,
            totalPrice,
            deliveryOption: selectedDeliveryOption.value
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
                        window.location.href = 'orderSummary.html';
                    })
                    .catch(err => console.error('Error clearing cart:', err));
            })
            .catch(err => {
                console.error('Error submitting payment:', err);
                alert('Failed to process payment. Please try again.');
            });
    };


    window.toggleMenu = () => {
        const menu = document.getElementById('hamburgerMenu');
        menu.classList.toggle('d-none');
        menu.classList.toggle('d-block');
    };


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
