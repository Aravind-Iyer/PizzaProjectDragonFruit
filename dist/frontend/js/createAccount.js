document.getElementById('createAccountForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const retypePassword = document.getElementById('retypePassword').value;
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const cardExpiry = document.getElementById('cardExpiry').value.trim();
    const cardCVV = document.getElementById('cardCVV').value.trim();

    if (password !== retypePassword) {
        alert("Passwords do not match. Please re-enter.");
        return;
    }

    // Block usernames with the .MP suffix for managers......
    if (username.endsWith('.MP')) {
        alert("You cannot create an account with a .MP suffix. Please use a different username.");
        return;
    }
    // Validation for Card Details
    if (!/^\d{16}$/.test(cardNumber)) {
        alert('Card number must be exactly 16 digits.');
        return;
    }

    if (!/^\d{3}$/.test(cardCVV)) {
        alert('CVV must be exactly 3 digits.');
        return;
    }

    if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        alert('Card expiry must be in MM/YY format.');
        return;
    }

    const [month, year] = cardExpiry.split('/').map(Number);
    if (month < 1 || month > 12) {
        alert('Invalid month in expiry date. It should be between 01 and 12.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/create-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, firstName, lastName, email, cardNumber, cardExpiry, cardCVV })
        });

        if (response.ok) {
            alert('Account created successfully. You can now log in.');
            window.location.href = 'login.html';
        } else {
            const data = await response.json();
            alert(data.message || 'Failed to create account.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});
