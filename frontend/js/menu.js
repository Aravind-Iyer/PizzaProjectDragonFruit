document.addEventListener("DOMContentLoaded", function () {
    // Hamburger menu toggle logic
    const burgerButton = document.getElementById("burgerButton");
    const dropdownMenu = document.getElementById("dropdownMenu");

    // Toggle the drop-down menu on burger button click
    burgerButton.addEventListener("click", function () {
        if (dropdownMenu.style.display === "none" || dropdownMenu.style.display === "") {
            dropdownMenu.style.display = "block";
        } else {
            dropdownMenu.style.display = "none";
        }
    });

    // Close the drop-down if clicking outside the menu
    document.addEventListener("click", function (event) {
        if (event.target !== burgerButton && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });

    // Add event listeners to all the links in the drop-down menu to close it after clicking
    const menuLinks = document.querySelectorAll("#dropdownMenu a");
    menuLinks.forEach(link => {
        link.addEventListener("click", function () {
            dropdownMenu.style.display = "none"; // Close the dropdown after clicking a link
        });
    });

    // Add event listener to navigate to the pizza customization page
    const pizzaButton = document.getElementById("pizzaButton");
    if (pizzaButton) {
        pizzaButton.addEventListener("click", function () {
            window.location.href = "/pizza.html";  // Navigate to pizza.html when the button is clicked
        });
    }

    // Add event listener to the Load Menu Options button
    const loadMenuButton = document.getElementById("loadMenuButton");
    if (loadMenuButton) {
        loadMenuButton.addEventListener("click", fetchMenuOptions);
    }

    // Add event listener for 'Place Order' button click
    const placeOrderButton = document.getElementById("placeOrderButton");
    if (placeOrderButton) {
        placeOrderButton.addEventListener("click", placeOrder);
    }
});

// Function to fetch menu options from the backend API
async function fetchMenuOptions() {
    try {
        console.log("Fetching menu options from backend...");

        const response = await fetch('http://localhost:3000/api/menu/options');
        if (!response.ok) {
            throw new Error("Failed to fetch menu options");
        }

        const menuData = await response.json();
        console.log("Menu data received:", menuData);

        renderMenuOptions(menuData);
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("menu-container").innerHTML = `<p>Error loading menu options. Please try again later.</p>`;
    }
}

// Function to render the menu options on the page
function renderMenuOptions(menuData) {
    const menuContainer = document.getElementById("menu-container");
    menuContainer.innerHTML = ""; // Clear previous contents

    // Render Pizza Options (if any)
    if (menuData.pizzas && menuData.pizzas.length > 0) {
        const pizzaSection = document.createElement("div");
        pizzaSection.classList.add("menu-section");
        pizzaSection.innerHTML = "<h2>Pizza Bases</h2>";

        menuData.pizzas.forEach(pizza => {
            const item = document.createElement("div");
            item.classList.add("menu-item");
            item.innerHTML = `
                <strong>${pizza.PizzaName}</strong> - $${pizza.Cost}
                <input type="radio" name="pizzaBase" value="${pizza.PizzasID}">
            `;
            pizzaSection.appendChild(item);
        });

        menuContainer.appendChild(pizzaSection);
    }

    // Render Crust, Toppings, and Options
    if (menuData.options && menuData.options.length > 0) {
        const optionsSection = document.createElement("div");
        optionsSection.classList.add("menu-section");
        optionsSection.innerHTML = "<h2>Pizza Options</h2>";

        menuData.options.forEach(option => {
            const item = document.createElement("div");
            item.classList.add("menu-item");
            item.innerHTML = `
                <strong>${option.Name}</strong> - $${option.Cost}
                <input type="checkbox" name="options" value="${option.OptionsID}">
            `;
            optionsSection.appendChild(item);
        });

        menuContainer.appendChild(optionsSection);
    }

    // Render Beverages
    if (menuData.beverages && menuData.beverages.length > 0) {
        const beverageSection = document.createElement("div");
        beverageSection.classList.add("menu-section");
        beverageSection.innerHTML = "<h2>Beverages</h2>";

        menuData.beverages.forEach(beverage => {
            const item = document.createElement("div");
            item.classList.add("menu-item");
            item.innerHTML = `
                <strong>${beverage.BeverageName}</strong> - $${beverage.Cost}
                <input type="checkbox" name="beverages" value="${beverage.BeveragesID}">
            `;
            beverageSection.appendChild(item);
        });

        menuContainer.appendChild(beverageSection);
    }

    // Render Sides
    if (menuData.sides && menuData.sides.length > 0) {
        const sidesSection = document.createElement("div");
        sidesSection.classList.add("menu-section");
        sidesSection.innerHTML = "<h2>Sides</h2>";

        menuData.sides.forEach(side => {
            const item = document.createElement("div");
            item.classList.add("menu-item");
            item.innerHTML = `
                <strong>${side.SideName}</strong> - $${side.Cost}
                <input type="checkbox" name="sides" value="${side.SidesID}">
            `;
            sidesSection.appendChild(item);
        });

        menuContainer.appendChild(sidesSection);
    }
}

// Function to place an order
async function placeOrder() {
    try {
        // Assume that CustomerID is stored in localStorage after login
        const customerID = localStorage.getItem('customerID');
        if (!customerID) {
            alert('You need to be logged in to place an order.');
            return;
        }

        // Collect selected menu items
        const pizzaBase = document.querySelector('input[name="pizzaBase"]:checked');
        const selectedOptions = Array.from(document.querySelectorAll('input[name="options"]:checked')).map(opt => opt.value);
        const selectedBeverages = Array.from(document.querySelectorAll('input[name="beverages"]:checked')).map(bev => bev.value);
        const selectedSides = Array.from(document.querySelectorAll('input[name="sides"]:checked')).map(side => side.value);

        // Construct the order payload
        const orderPayload = {
            customerID: parseInt(customerID), // Add CustomerID
            pizzaBase: pizzaBase ? parseInt(pizzaBase.value) : null,
            options: selectedOptions.map(opt => parseInt(opt)),
            beverages: selectedBeverages.map(bev => parseInt(bev)),
            sides: selectedSides.map(side => parseInt(side)),
            totalCost: calculateTotalCost()
        };

        console.log("Order payload:", orderPayload);

        // Send the order to the backend
        const response = await fetch('http://localhost:3000/api/menu/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderPayload),
        });

        if (!response.ok) {
            throw new Error('Failed to place order');
        }

        alert('Order placed successfully!');
    } catch (error) {
        console.error("Error placing order:", error);
        alert('Failed to place the order. Please try again.');
    }
}

// Function to calculate total cost of the order (basic implementation)
function calculateTotalCost() {
    let totalCost = 0;

    // Add cost of pizza base
    const pizzaBase = document.querySelector('input[name="pizzaBase"]:checked');
    if (pizzaBase) {
        totalCost += parseFloat(pizzaBase.parentElement.querySelector('strong').textContent.split('$')[1]);
    }

    // Add cost of selected options, beverages, and sides
    document.querySelectorAll('input:checked').forEach(input => {
        totalCost += parseFloat(input.parentElement.querySelector('strong').textContent.split('$')[1]);
    });

    return totalCost;
}
