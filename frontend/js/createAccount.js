document.getElementById('createAccountForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const retypePassword = document.getElementById('retypePassword').value;

    if (password !== retypePassword) {
        alert("Passwords do not match. Please re-enter.");
        return;
    }

    if (password.length < 12) {
        alert("Password must be at least 12 characters long.");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/create-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, firstName, lastName, email })
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
