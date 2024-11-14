// accountInfo.js - Fetches and manages account information

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please log in first.');
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/account-info', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            // Set data to input fields
            document.getElementById('email').value = data.email || "";
            document.getElementById('phone').value = data.phone || "";
            document.getElementById('address').value = data.address || "";
            document.getElementById('username').value = data.username || ""; // Optional, read-only
        } else {
            alert('Failed to load account information. Please log in again.');
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching account information. Please try again later.');
    }
});

async function saveAccountInfo() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please log in first.');
        window.location.href = 'login.html';
        return;
    }

    // Retrieve form data
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();

    // Simple validation to check if all fields are filled out
    if (!email || !phone || !address) {
        alert('All fields are required. Please fill them out.');
        return;
    }

    // Ensure phone length matches database constraints
    if (phone.length > 10) {
        alert('Phone number must be 10 characters or less.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/account-info', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, phone, address })
        });

        if (response.ok) {
            alert('Account information updated successfully.');
        } else {
            alert('Failed to update account information. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while updating account information. Please try again later.');
    }
}

async function deleteAccount() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please log in first.');
        window.location.href = 'login.html';
        return;
    }

    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        try {
            const response = await fetch('http://localhost:3000/api/account-info', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert('Account deleted successfully.');
                localStorage.removeItem('token');
                window.location.href = 'createAccount.html';
            } else {
                alert('Failed to delete account. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while deleting your account. Please try again later.');
        }
    }
}
