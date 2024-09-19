document.addEventListener("DOMContentLoaded", function() {
    // Load Header
    fetch('/components/header.html')
        .then(response => response.text())
        .then(data => document.getElementById("header").innerHTML = data);

    // Load Footer
    fetch('/components/footer.html')
        .then(response => response.text())
        .then(data => document.getElementById("footer").innerHTML = data);
});


// Select the ellipsis button and the menu
const ellipsisButtons = document.querySelectorAll('.ellipsis-btn');
const menus = document.querySelectorAll('.menu-options');

// Add event listener to all ellipsis buttons
ellipsisButtons.forEach((button, index) => {
  button.addEventListener('click', function() {
    // Toggle visibility of the corresponding menu
    const menu = menus[index];
    if (menu.style.display === 'none' || menu.style.display === '') {
      menu.style.display = 'block';
    } else {
      menu.style.display = 'none';
    }
  });
});

// Close menu when clicking outside
window.addEventListener('click', function(event) {
  ellipsisButtons.forEach((button, index) => {
    if (!button.contains(event.target) && !menus[index].contains(event.target)) {
      menus[index].style.display = 'none';
    }
  });
});