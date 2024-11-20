document.addEventListener('DOMContentLoaded', () => {
    fetchManagerData();

    const hamburgerMenu = document.getElementById('hamburgerMenu');

    async function fetchManagerData() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Unauthorized access! Please log in.');
                window.location.href = 'login.html';
                return;
            }


            const pizzaResponse = await fetch('http://localhost:3000/api/pizzas-sold', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const pizzaData = await pizzaResponse.json();

            const numOfPizzasElement = document.getElementById('numOfPizzas');
            numOfPizzasElement.textContent = pizzaData.count || '0';


            const scheduleResponse = await fetch('http://localhost:3000/api/employee-schedule', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const scheduleData = await scheduleResponse.json();

            const employeeScheduleElement = document.getElementById('employeeSchedule');
            if (scheduleData.schedule && scheduleData.schedule.length > 0) {
                employeeScheduleElement.textContent = scheduleData.schedule
                    .map((schedule) => `${schedule.name}, ${schedule.time}`)
                    .join(', ');
            } else {
                employeeScheduleElement.textContent = 'No schedules available.';
            }
        } catch (error) {
            console.error('Error fetching manager data:', error);
            alert('Failed to load manager data. Please try again.');
        }
    }


    window.toggleMenu = () => {
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        if (hamburgerMenu) {
            hamburgerMenu.classList.toggle('d-none');
        } else {
            console.error('Hamburger menu element not found!');
        }
    };


    document.addEventListener('click', (event) => {
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        const hamburgerButton = document.querySelector('.hamburger-button');

        if (!hamburgerMenu || !hamburgerButton) {
            console.error('Hamburger menu or button element not found!');
            return;
        }

        const isClickInsideMenu = hamburgerMenu.contains(event.target);
        const isClickOnButton = hamburgerButton.contains(event.target);

        console.log('Clicked outside hamburger menu:', !isClickInsideMenu && !isClickOnButton);

        if (!isClickInsideMenu && !isClickOnButton && !hamburgerMenu.classList.contains('d-none')) {
            hamburgerMenu.classList.add('d-none');
        }
    });


    window.goToAccountInfo = () => {
        window.location.href = 'accountInfo.html';
    };

    window.logout = () => {
        localStorage.clear();
        alert('You have successfully logged out.');
        window.location.href = 'login.html';
    };

    window.goToHome = () => {
        window.location.href = 'home.html';
    };
});
