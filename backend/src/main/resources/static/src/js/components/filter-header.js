document.addEventListener("DOMContentLoaded", function () {
  // Get all necessary elements
  const filterHeader = document.querySelector(".filter-header");
  const filterToggle = document.querySelector(".filter-toggle");
  const filterWindow = document.querySelector(".characteristics");
  const tinderContainer = document.querySelector(".tinder-container");

  // Verify all elements exist
  if (!filterHeader || !filterToggle || !filterWindow || !tinderContainer) {
    console.error("Some filter elements are missing:", {
      filterHeader: !!filterHeader,
      filterToggle: !!filterToggle,
      filterWindow: !!filterWindow,
      tinderContainer: !!tinderContainer,
    });
    return;
  }

  // Initialize state
  let isFilterVisible = false; // Start with filters hidden

  // Function to update filter visibility
  function updateFilterVisibility(visible) {
    isFilterVisible = visible;

    if (visible) {
      // Show filters
      filterWindow.classList.remove("hidden");
      tinderContainer.classList.remove("filter-collapsed");
      const icon = filterToggle.querySelector("i");
      if (icon) {
        icon.style.transform = "rotate(0)";
      }
    } else {
      // Hide filters
      filterWindow.classList.add("hidden");
      tinderContainer.classList.add("filter-collapsed");
      const icon = filterToggle.querySelector("i");
      if (icon) {
        icon.style.transform = "rotate(180deg)";
      }
    }
  }

  // Toggle filter visibility
  filterToggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateFilterVisibility(!isFilterVisible);
  });

  // Handle window resize
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (isFilterVisible) {
        const headerHeight = filterHeader.offsetHeight;
        const windowHeight = window.innerHeight;
        const filterHeight = filterWindow.offsetHeight;

        if (headerHeight + filterHeight > windowHeight) {
          filterWindow.style.maxHeight = `${windowHeight - headerHeight - 40}px`;
        } else {
          filterWindow.style.maxHeight = "none";
        }
      }
    }, 100);
  });

  // Initialize filter window as hidden
  updateFilterVisibility(false);

  // Add click outside to close
  document.addEventListener("click", (e) => {
    // Don't close if clicking the toggle button or inside the filter window
    if (e.target === filterToggle || filterWindow.contains(e.target)) {
      return;
    }

    // Close if clicking outside
    if (
      isFilterVisible &&
      !filterHeader.contains(e.target) &&
      !filterWindow.contains(e.target)
    ) {
      updateFilterVisibility(false);
    }
  });

  // Prevent filter window from closing when clicking inside it
  filterWindow.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Handle escape key to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isFilterVisible) {
      updateFilterVisibility(false);
    }
  });
});
