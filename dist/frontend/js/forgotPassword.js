document.getElementById('emailForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;

    try {
        const response = await fetch('http://localhost:3000/api/forgotPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (response.ok) {
            alert('A code to change your password has been sent to your email.');
            window.location.href = 'login.html'; // Redirect to homepage
        } else {
            alert(data.message || 'Email not found. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred.');
    }
});