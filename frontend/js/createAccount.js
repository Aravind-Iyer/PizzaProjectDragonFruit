// createAccount.js - Handles user registration functionality

document.getElementById('createAccountForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('username').value; // Assuming email is same as username
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;

    try {
        const response = await fetch('http://localhost:3000/api/create-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, email, firstName, lastName })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Account created successfully. You can now log in.');
            // Redirect to login page
            window.location.href = 'login.html';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while creating your account. Please try again later.');
    }
});
