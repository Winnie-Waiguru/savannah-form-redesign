const form = document.getElementById("logInForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rememberMeCheckBox = document.getElementById("remember-btn");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // prevent form submission

  //validate Email
  const emailError = document.getElementById("emailError");
  if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(emailInput.value)) {
    emailError.textContent = "Please enter a valid email address.";
    return;
  } else {
    emailError.textContent = "";
  }

  //validate password
  const passwordError = document.getElementById("passwordError");
  if (passwordInput.value.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters long.";
    return;
  } else {
    passwordError.textContent = "";
  }

  //   Show succese message
  const successMessage = document.getElementById("successMessage");
  successMessage.style.display = "block";
  //clear success message after 3 seconds
  setTimeout(() => {
    successMessage.style.display = "none";
  }, 2000);

  // Remember me
  const rememberMe = rememberMeCheckBox.checked;
  if (rememberMe) {
    // Store in local storage
    localStorage.setItem("userEmail", emailInput.value);
    sessionStorage.removeItem("userEmail");
  } else {
    //store in session storage
    sessionStorage.setItem("userEmail", emailInput.value);
    // remove from local storage if remember me is unchecked
    localStorage.removeItem("userEmail");
  }

  // Clear form data
  emailInput.value = "";
  passwordInput.value = "";
});

function loadSavedCredentials() {
  let savedUserName =
    localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");

  if (savedUserName) {
    emailInput.value = savedUserName;
  }
}

//On page load, try to load saved credentials
window.onload = loadSavedCredentials;
