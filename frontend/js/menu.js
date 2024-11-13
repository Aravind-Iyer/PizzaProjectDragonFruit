document.addEventListener("DOMContentLoaded", function () {
    // Add event listener to the Load Menu Options button
    const loadMenuButton = document.getElementById("loadMenuButton");
    loadMenuButton.addEventListener("click", fetchMenuOptions);
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

    // Render Pizza Options (if needed)
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
