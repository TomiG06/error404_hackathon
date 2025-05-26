document.addEventListener("DOMContentLoaded", function () {
  const filterWindow = document.querySelector(".characteristics");
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  // Mouse events for dragging
  filterWindow.addEventListener("mousedown", dragStart);
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", dragEnd);

  function dragStart(e) {
    // Only start drag if clicking on the window itself
    if (
      e.target === filterWindow ||
      e.target.classList.contains("interest-tag")
    ) {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
      isDragging = true;
      filterWindow.classList.add("dragging");
    }
  }

  function drag(e) {
    if (isDragging) {
      e.preventDefault();

      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      xOffset = currentX;
      yOffset = currentY;

      setTranslate(currentX, currentY, filterWindow);
    }
  }

  function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
    filterWindow.classList.remove("dragging");
  }

  function setTranslate(xPos, yPos, el) {
    // Get the viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Get the element dimensions
    const elementWidth = el.offsetWidth;
    const elementHeight = el.offsetHeight;

    // Calculate boundaries with some padding
    const maxX = viewportWidth - elementWidth - 20; // 20px padding from right edge
    const maxY = viewportHeight - elementHeight - 20; // 20px padding from bottom edge

    // Constrain the position within viewport
    xPos = Math.min(Math.max(-20, xPos), maxX); // Allow 20px outside left edge
    yPos = Math.min(Math.max(-20, yPos), maxY); // Allow 20px outside top edge

    el.style.transform = `translate(${xPos}px, ${yPos}px)`;
  }

  // Reset position on window resize
  window.addEventListener("resize", function () {
    // Reset to default position
    xOffset = 0;
    yOffset = 0;
    filterWindow.style.transform = "translate(20px, -50%)";
  });

  // Add close button
  const closeButton = document.createElement("button");
  closeButton.className = "filter-close-button";
  closeButton.innerHTML = "X";
  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "10px";
  closeButton.style.zIndex = "101";
  filterWindow.appendChild(closeButton);

  // Close button functionality
  closeButton.addEventListener("click", () => {
    filterWindow.style.display = "none";
  });
});
