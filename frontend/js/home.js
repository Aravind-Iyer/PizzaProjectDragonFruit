// home.js

// Function to navigate to the menu page
function navigateToMenu() {
    window.location.href = 'menu.html';
}
// home.js

// Function to toggle the hamburger menu
function toggleMenu() {
    const menu = document.getElementById("hamburgerMenu");
    menu.classList.toggle("d-none");
    menu.classList.toggle("d-block");
}