const formElements = {
  email: document.getElementById("email"),
  country: document.getElementById("country"),
  postcode: document.getElementById("postcode"),
  password: document.getElementById("password"),
  confirmPassword: document.getElementById("confirm-password"),
  submitButton: document.getElementById("submit-button"),
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
  const isValid = rule.test(input.value);
  input.setCustomValidity(isValid ? "" : message);
  input.reportValidity();
  return isValid;
};

const validateCountry = (input) => {
  const isValid = !input.validity.tooShort;
  input.setCustomValidity(isValid ? "" : errorMessages.country);
  input.reportValidity();
  return isValid;
};

const validateConfirmPassword = (input, passwordInput) => {
  let isValid = true;

  if (!validationRules.password.test(input.value)) {
    input.setCustomValidity(
      `${errorMessages.password}\n${errorMessages.passwordMismatch}`
    );
    isValid = false;
  } else if (input.value !== passwordInput.value) {
    input.setCustomValidity(errorMessages.passwordMismatch);
    isValid = false;
  } else {
    input.setCustomValidity("");
  }

  input.reportValidity();
  return isValid;
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

formElements.submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (
    formElements.email.validity.valid &&
    formElements.country.validity.valid &&
    formElements.postcode.validity.valid &&
    formElements.password.validity.valid &&
    formElements.confirmPassword.validity.valid
  ) {
    alert("Form submitted successfully!");
  } else {
    alert("Please correct the errors in the form before submitting.");
  }
});

const validateForm = () => {
  const isValid =
    formElements.email.validity.valid &&
    formElements.country.validity.valid &&
    formElements.postcode.validity.valid &&
    formElements.password.validity.valid &&
    formElements.confirmPassword.validity.valid;

  formElements.submitButton.disabled = !isValid;
  formElements.submitButton.setAttribute("aria-disabled", !isValid);
};

Object.keys(formElements).forEach((key) => {
  if (key !== "submitButton") {
    formElements[key].addEventListener("input", validateForm);
  }
});
formElements.submitButton.disabled = true;
formElements.submitButton.setAttribute("aria-disabled", true);
