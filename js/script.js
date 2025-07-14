const emailInput = document.getElementById("email");
const countryInput = document.getElementById("country");
const postcodeInput = document.getElementById("postcode");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

const emailRegex = /^[^\s@]+@[a-zA-Z]+\.[a-zA-Z]+$/;
const postcodeRegex = /^\d{5,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

emailInput.addEventListener("input", () => {
  if (emailRegex.test(emailInput.value) === false) {
    emailInput.setCustomValidity("I am expecting an email address!");
  } else {
    emailInput.setCustomValidity("");
  }
  emailInput.reportValidity();
});

countryInput.addEventListener("input", () => {
  if (countryInput.validity.tooShort) {
    countryInput.setCustomValidity(
      "Country name must be at least 4 characters long."
    );
  } else {
    countryInput.setCustomValidity("");
  }
  countryInput.reportValidity();
});

postcodeInput.addEventListener("input", () => {
  if (postcodeRegex.test(postcodeInput.value) === false) {
    postcodeInput.setCustomValidity(
      "Poste code must be at least 5 numbers long."
    );
  } else {
    postcodeInput.setCustomValidity("");
  }
  postcodeInput.reportValidity();
});

passwordInput.addEventListener("input", () => {
  if (passwordRegex.test(passwordInput.value) === false) {
    passwordInput.setCustomValidity(
      "Password must contain at least 8 characters, including uppercase, lowercase, a number and special characters"
    );
  } else {
    passwordInput.setCustomValidity("");
  }
  passwordInput.reportValidity();
});

confirmPasswordInput.addEventListener("input", () => {
  if (passwordRegex.test(confirmPasswordInput.value) === false) {
    confirmPasswordInput.setCustomValidity(
      "Password must contain at least 8 characters, including uppercase, lowercase, a number and special characters.\nPasswords must match."
    );
  } else if (confirmPasswordInput.value !== passwordInput.value) {
    confirmPasswordInput.setCustomValidity("Passwords must match.");
  } else {
    confirmPasswordInput.setCustomValidity("");
  }
  confirmPasswordInput.reportValidity();
});
