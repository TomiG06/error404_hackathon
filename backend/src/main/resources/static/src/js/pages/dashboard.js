// Check localStorage for user data
document.addEventListener("DOMContentLoaded", function () {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userRegisterTd = document.getElementById("user-register-td");

  if (userData && userData.username) {
    // If user data exists, create a circle with the first letter of the username
    const firstLetter = userData.username.charAt(0).toUpperCase();
    const userCircle = document.createElement("div");
    userCircle.className = "user-circle";
    userCircle.textContent = firstLetter;
    userCircle.style.backgroundColor = "#132f58"; // Example background color
    userCircle.style.color = "#ffffff"; // Example text color
    userCircle.style.width = "36px";
    userCircle.style.height = "36px";
    userCircle.style.borderRadius = "50%";
    userCircle.style.display = "flex";
    userCircle.style.alignItems = "center";
    userCircle.style.justifyContent = "center";
    userCircle.style.fontSize = "18px";
    userCircle.style.cursor = "pointer";

    // Add hover effect
    userCircle.addEventListener("mouseenter", () => {
      userCircle.style.transform = "scale(1.1)";
    });
    userCircle.addEventListener("mouseleave", () => {
      userCircle.style.transform = "scale(1)";
    });

    // Replace the Register button with the user circle
    userRegisterTd.innerHTML = "";
    userRegisterTd.appendChild(userCircle);
  } else {
    // If no user data exists, show the Register button
    userRegisterTd.innerHTML = '<a href="index.html">Register</a>';
  }
});
