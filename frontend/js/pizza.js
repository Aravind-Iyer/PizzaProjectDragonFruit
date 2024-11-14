document.addEventListener("DOMContentLoaded", function () {
    const burgerButton = document.getElementById("burgerButton");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const addToCartButton = document.getElementById("addToCartButton");

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

    // Handle Add to Cart Button Click
    addToCartButton.addEventListener("click", async function () {
        const pizzaSize = document.getElementById("pizzaSize").value;
        const pizzaSauce = document.getElementById("pizzaSauce").value;
        const pizzaCrust = document.getElementById("pizzaCrust").value;
        const cheeseLevel = document.querySelector('input[name="cheeseLevel"]:checked').value;

        const vegetarianToppings = Array.from(document.querySelectorAll('input[name="vegTopping"]:checked')).map(el => el.value);
        const meatToppings = Array.from(document.querySelectorAll('input[name="meatTopping"]:checked')).map(el => el.value);

        const pizzaOrder = {
            size: pizzaSize,
            sauce: pizzaSauce,
            crust: pizzaCrust,
            cheese: cheeseLevel,
            vegetarianToppings,
            meatToppings
        };

        try {
            console.log("Sending pizza order to backend:", pizzaOrder);

            // Send the pizza order data to the backend
            const response = await fetch('http://localhost:3000/api/menu/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pizzaOrder),
            });

            if (!response.ok) {
                throw new Error("Failed to add pizza to cart");
            }

            const responseData = await response.json();
            console.log("Response from backend:", responseData);

            alert("Your pizza has been added to the cart!");
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to add pizza to cart. Please try again.");
        }
    });
});
