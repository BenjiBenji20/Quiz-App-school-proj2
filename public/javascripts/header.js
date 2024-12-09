// Add active class to the nav item based on the current URL
var header = document.getElementById("nav-bar");
var navLinks = header.getElementsByClassName("nav-link");

// Get the current path (URL) without the domain
var currentPath = window.location.pathname;

for (var i = 0; i < navLinks.length; i++) {
  // Check if the href of the nav link matches the current URL
  if (navLinks[i].getAttribute('href') === currentPath) {
    navLinks[i].classList.add("active");
    navLinks[i].style.color = '#007bff';
  } else {
    navLinks[i].classList.remove("active");
  }
}
