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
            document.getElementById('cardNumber').value = data.cardNumber || "";
            document.getElementById('cardExpiry').value = data.cardExpiry || "";
            document.getElementById('cardCVV').value = data.cardCVV || "";
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
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const cardExpiry = document.getElementById('cardExpiry').value.trim();
    const cardCVV = document.getElementById('cardCVV').value.trim();

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
        const response = await fetch('http://localhost:3000/api/account-info', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, phone, address, cardNumber, cardExpiry, cardCVV })
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
async function deleteAccount() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You must be logged in to delete your account.');
        window.location.href = 'login.html';
        return;
    }

    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        return; // User canceled the deletion
    }

    try {
        const response = await fetch('http://localhost:3000/api/delete-account', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            alert('Your account has been deleted successfully.');
            localStorage.removeItem('token');
            window.location.href = 'home.html'; // Redirect to home page after deletion
        } else {
            const errorData = await response.json();
            alert(`Failed to delete account: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error deleting account:', error);
        alert('An error occurred while deleting your account. Please try again.');
    }
}