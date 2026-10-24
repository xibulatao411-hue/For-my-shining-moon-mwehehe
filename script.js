
document.addEventListener("DOMContentLoaded", () => {
  const correctPassword = "09172009";

  const login = document.getElementById("login");
  const question = document.getElementById("question");
  const success = document.getElementById("success");

  const loginForm = document.getElementById("loginForm");
  const passwordInput = document.getElementById("password");
  const error = document.getElementById("error");

  const yesButton = document.getElementById("yes");
  const noButton = document.getElementById("no");
  const heartsContainer = document.querySelector(".hearts");

  // Check the password
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (passwordInput.value === correctPassword) {
      login.classList.add("hidden");
      question.classList.remove("hidden");
      error.textContent = "";
      createHearts(12);
    } else {
      error.textContent = "Oops! That's not the right password. 💚";
      passwordInput.value = "";
      passwordInput.focus();
    }
  });

  // Make the No button move away
  function moveNoButton() {
    const area = question.getBoundingClientRect();
    const button = noButton.getBoundingClientRect();

    const maxX = Math.max(0, area.width - button.width - 24);
    const maxY = Math.max(0, area.height - button.height - 24);

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noButton.style.position = "fixed";
    noButton.style.left = `${Math.max(
      8,
      Math.min(window.innerWidth - button.width - 8,
      area.left + x)
    )}px`;

    noButton.style.top = `${Math.max(
      8,
      Math.min(window.innerHeight - button.height - 8,
      area.top + y)
    )}px`;
  }

  noButton.addEventListener("pointerenter", moveNoButton);
  noButton.addEventListener("click", (event) => {
    event.preventDefault();
    moveNoButton();
  });

  noButton.addEventListener("touchstart", (event) => {
    event.preventDefault();
    moveNoButton();
  }, { passive: false });

  // Show the letter when Yes is clicked
  yesButton.addEventListener("click", () => {
    question.classList.add("hidden");
    success.classList.remove("hidden");

    noButton.style.position = "relative";
    noButton.style.left = "";
    noButton.style.top = "";

    createHearts(35);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // Create floating green hearts
  function createHearts(amount) {
    for (let i = 0; i < amount; i++) {
      const heart = document.createElement("span");

      heart.className = "heart";
      heart.textContent = Math.random() > 0.5 ? "💚" : "♡";
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.animationDuration = `${4 + Math.random() * 5}s`;
      heart.style.animationDelay = `${Math.random() * 2}s`;
      heart.style.fontSize = `${14 + Math.random() * 18}px`;

      heartsContainer.appendChild(heart);

      heart.addEventListener("animationend", () => {
        heart.remove();
      });
    }
  }

  // Add a few background hearts on page load
  createHearts(10);
});
