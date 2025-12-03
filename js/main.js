// Profile dropdown
const profileToggle = document.getElementById("profileToggle");
const profileMenu = document.getElementById("profileMenu");

profileToggle.addEventListener("click", () => {
  profileMenu.classList.toggle("show");
});

document.addEventListener("click", (e) => {
  if (!profileMenu.contains(e.target) && !profileToggle.contains(e.target)) {
    profileMenu.classList.remove("show");
  }
});

// Tabs – visual only
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
  });
});

// Accordion filter groups
document.querySelectorAll(".filter-group").forEach((group) => {
  const header = group.querySelector(".filter-header");
  header.addEventListener("click", (e) => {
    if (e.target.closest(".filter-header")) {
      group.classList.toggle("open");
    }
  });
});

// Dual-range price slider on single bar
const priceMin = document.getElementById("priceMin");
const priceMax = document.getElementById("priceMax");
const priceMinInput = document.getElementById("priceMinInput");
const priceMaxInput = document.getElementById("priceMaxInput");
const rangeFill = document.getElementById("rangeFill");

function updateRangeFill() {
  const min = parseInt(priceMin.value, 10);
  const max = parseInt(priceMax.value, 10);
  const minPercent = (min / priceMax.max) * 100;
  const maxPercent = (max / priceMax.max) * 100;
  
  rangeFill.style.left = minPercent + "%";
  rangeFill.style.width = (maxPercent - minPercent) + "%";
}

function clampValue(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function handleSliderInput(e) {
  let min = parseInt(priceMin.value, 10);
  let max = parseInt(priceMax.value, 10);

  if (min > max) {
    if (e.target === priceMin) {
      max = min;
      priceMax.value = max;
    } else {
      min = max;
      priceMin.value = min;
    }
  }

  // Update input fields
  priceMinInput.value = min;
  priceMaxInput.value = max;
  
  updateRangeFill();
}

function handleInputFieldChange(e) {
  let value = parseInt(e.target.value) || 0;
  const minLimit = parseInt(priceMin.min, 10);
  const maxLimit = parseInt(priceMax.max, 10);
  
  // Clamp value to valid range
  value = clampValue(value, minLimit, maxLimit);
  e.target.value = value;

  if (e.target === priceMinInput) {
    let max = parseInt(priceMax.value, 10);
    if (value > max) {
      value = max;
      e.target.value = value;
    }
    priceMin.value = value;
  } else {
    let min = parseInt(priceMin.value, 10);
    if (value < min) {
      value = min;
      e.target.value = value;
    }
    priceMax.value = value;
  }

  updateRangeFill();
}

// Sync sliders with input fields
priceMin.addEventListener("input", handleSliderInput);
priceMax.addEventListener("input", handleSliderInput);

// Sync input fields with sliders
priceMinInput.addEventListener("input", handleInputFieldChange);
priceMinInput.addEventListener("blur", handleInputFieldChange);
priceMaxInput.addEventListener("input", handleInputFieldChange);
priceMaxInput.addEventListener("blur", handleInputFieldChange);

// Initialize
handleSliderInput({ target: priceMax });

// Size presets – single active
document.querySelectorAll(".size-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const already = btn.classList.contains("active");
    document
      .querySelectorAll(".size-btn")
      .forEach((b) => b.classList.remove("active"));
    if (!already) btn.classList.add("active");
  });
});

// Clear all filters
document.getElementById("clearFilters").addEventListener("click", () => {
  document
    .querySelectorAll(".filters-panel input[type='checkbox']")
    .forEach((cb) => (cb.checked = false));

  document
    .querySelectorAll(".filters-panel input[data-default='true']")
    .forEach((cb) => (cb.checked = true));

  priceMin.value = priceMin.min;
  priceMax.value = priceMax.max;
  priceMinInput.value = priceMin.min;
  priceMaxInput.value = priceMax.max;
  handleSliderInput({ target: priceMax });

  document
    .querySelectorAll(".size-btn")
    .forEach((b) => b.classList.remove("active"));
  document.getElementById("heightCm").value = "";
  document.getElementById("widthCm").value = "";
});

