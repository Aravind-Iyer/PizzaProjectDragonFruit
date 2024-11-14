document.addEventListener("DOMContentLoaded", function () {
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

    // Close the menu if clicking outside the drop-down
    document.addEventListener("click", function (event) {
        if (event.target !== burgerButton && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });
});
