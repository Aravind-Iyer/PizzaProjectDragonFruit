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
            document.getElementById('email').value = data.email || "";
            document.getElementById('phone').value = data.phone || "";
            document.getElementById('address').value = data.address || "";
            document.getElementById('username').value = data.username || ""; // Read-only
        } else {
            alert('Failed to load account information.');
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});

async function saveAccountInfo() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();

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
            alert('Failed to update account information.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Try again later.');
    }
}
