document.addEventListener("DOMContentLoaded", function () {
  // Get all navigation links
  const navLinks = document.querySelectorAll("nav a");

  // Get the current page URL
  const currentPage = window.location.pathname.split("/").pop();

  // Loop through all navigation links
  navLinks.forEach((link) => {
    // Get the href attribute
    const href = link.getAttribute("href");

    // Check if this link corresponds to the current page
    if (href === currentPage) {
      // Add the active class
      link.classList.add("active");
    }
  });
});
