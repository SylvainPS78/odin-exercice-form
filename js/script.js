const formElements = {
  email: document.getElementById("email"),
  country: document.getElementById("country"),
  postcode: document.getElementById("postcode"),
  password: document.getElementById("password"),
  confirmPassword: document.getElementById("confirm-password"),
};

const validationRules = {
  email: /^[^\s@]+@[a-zA-Z]+\.[a-zA-Z]+$/,
  postcode: /^\d{5,}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
};

const errorMessages = {
  email: "Please enter a valid email address",
  country: "Country name must be at least 4 characters long",
  postcode: "Post code must be at least 5 numbers long",
  password:
    "Password must contain at least 8 characters, including uppercase, lowercase, a number and special characters",
  passwordMismatch: "Passwords must match",
};

const validateInput = (input, rule, message) => {
  if (!rule.test(input.value)) {
    input.setCustomValidity(message);
  } else {
    input.setCustomValidity("");
  }
  input.reportValidity();
};

const validateCountry = (input) => {
  if (input.validity.tooShort) {
    input.setCustomValidity(errorMessages.country);
  } else {
    input.setCustomValidity("");
  }
  input.reportValidity();
};

const validateConfirmPassword = (input, passwordInput) => {
  if (!validationRules.password.test(input.value)) {
    input.setCustomValidity(
      `${errorMessages.password}\n${errorMessages.passwordMismatch}`
    );
  } else if (input.value !== passwordInput.value) {
    input.setCustomValidity(errorMessages.passwordMismatch);
  } else {
    input.setCustomValidity("");
  }
  input.reportValidity();
};

// Event Listeners
formElements.email.addEventListener("input", () =>
  validateInput(formElements.email, validationRules.email, errorMessages.email)
);

formElements.country.addEventListener("input", () =>
  validateCountry(formElements.country)
);

formElements.postcode.addEventListener("input", () =>
  validateInput(
    formElements.postcode,
    validationRules.postcode,
    errorMessages.postcode
  )
);

formElements.password.addEventListener("input", () =>
  validateInput(
    formElements.password,
    validationRules.password,
    errorMessages.password
  )
);

formElements.confirmPassword.addEventListener("input", () =>
  validateConfirmPassword(formElements.confirmPassword, formElements.password)
);
