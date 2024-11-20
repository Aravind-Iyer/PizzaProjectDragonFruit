document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {

            localStorage.setItem('token', data.token);
            localStorage.setItem('customerId', data.customerId);
            localStorage.setItem('isManager', data.isManager ? 'true' : 'false');
            alert('Login successful');
            console.log('isManager:', data.isManager);

            if (data.isManager) {
                window.location.href = 'managerDashboard.html';
            } else {
                window.location.href = 'home.html';
            }
        } else {
            alert(data.message || 'Login failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login.');
    }
});
