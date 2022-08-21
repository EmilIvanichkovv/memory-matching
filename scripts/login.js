// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import {
  getDatabase,
  child,
  get,
  ref,
  push,
  set,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";

// ERROR MESSAGES:
// Login error messages
const errorEmptyEmail = "PLEASE ENTER E-MAIL";
const errorInvalidEmail = "EMAIL IS NOT VALID";
const errorNonRegisteredEmail = "E-MAIL IS NOT REGISTERED YET";
const errorEmptyPassword = "PLEASE ENTER PASSWORD";
const errorIncorrectPassword = "PASSWORD IS NOT CORRECT";
// Register error messages
const errorBlankUsername = "USERNAME CANNOT BE BLANK";
const errorBlankEmail = "EMAIL CANNOT BE BLANK";
const errorDuplicateEmail = "THIS EMAIL ALREADY EXISTS";
const errorPasswordLength = "PASSWORD MUST BE AT LEAST 5 SYMBOLS";
const errorPasswordConfirmation = "PASSWORD DOES NOT MATCH";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiugbpO2Tid9-9SGS8zw0_PW2obxlPFA0",
  authDomain: "memorymatchinggame.firebaseapp.com",
  projectId: "memorymatchinggame",
  storageBucket: "memorymatchinggame.appspot.com",
  messagingSenderId: "495458129080",
  appId: "1:495458129080:web:64279c6b1841698122904d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const usersDataRef = ref(database, "users/");

// COMMON UTILS
function setError(item, message) {
  const itemParent = item.parentElement;
  const errorItem = itemParent.querySelector("small");

  errorItem.innerHTML = `${message}`;

  item.classList.add("error");
  item.classList.remove("valid");
  item.classList.remove("neonBoxes");
}

function setValid(item) {
  const itemParent = item.parentElement;
  const errorItem = itemParent.querySelector("small");

  errorItem.innerHTML = ``;

  item.classList.add("valid");
  item.classList.remove("error");
  item.classList.remove("neonBoxes");
}

function setDefault(item) {
  const itemParent = item.parentElement;
  const errorItem = itemParent.querySelector("small");

  item.value = "";
  errorItem.innerHTML = ``;
  item.classList.remove("valid");
  item.classList.add("neonBoxes");
}

function validateEmail(input) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
    return true;
  }
  return false;
}

// FIREBASE UTILS
// Get user by given email address from database
async function getUserByEmail(email) {
  const dbRef = ref(database);
  const temp = await get(child(dbRef, "users/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        for (var userId in snapshot.val()) {
          if (snapshot.val()[userId].email === email) {
            return snapshot.val()[userId];
          }
        }
        return false;
      } else {
        console.log("There is no data for 'users'");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return temp;
}

async function getUsername(email) {
  const userPromise = getUserByEmail(email);
  return userPromise.then(function (user) {
    if (user.email == email) {
      return user.username;
    }
  });
}

// Write new user to the database
function writeNewUserData(username, email, password) {
  const newUserRef = push(usersDataRef);
  const userId = newUserRef.key;
  set(ref(database, "users/" + userId), {
    email: email,
    username: username,
    password: password,
  })
    .then(() => {})
    .catch((error) => {});
  return newUserRef.key;
}

// LOGIN UTILS:
// Login buttons:
const loginButton = document.getElementById("login-submit");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");

loginEmail.addEventListener("change", (event) => {
  event.preventDefault();
  checkLoginEmail();
});

loginPassword.addEventListener("change", (event) => {
  event.preventDefault();
  checkLoginPassword();
});

loginButton.addEventListener("click", loginPlayer);

async function checkEmailExistence(inputEmail) {
  return getUserByEmail(`${inputEmail}`).then(function (user) {
    if (user.email === `${inputEmail}`) {
      return true;
    }
    return false;
  });
}

async function checkEmailPasswordMatch(inputEmail, inputPassword) {
  return getUserByEmail(`${inputEmail}`).then(function (user) {
    if (user.email === inputEmail && user.password === inputPassword) {
      return true;
    }
    return false;
  });
}

function checkLoginEmail() {
  let inputEmail = loginEmail.value.trim();
  if (inputEmail == "") {
    setError(loginEmail, errorEmptyEmail);
    return false;
  } else if (validateEmail(inputEmail) === false) {
    setError(loginEmail, errorInvalidEmail);
    return false;
  } else {
    return checkEmailExistence(inputEmail).then(function (res) {
      if (res === false) {
        setError(loginEmail, errorNonRegisteredEmail);
        return false;
      } else {
        setValid(loginEmail);
        return true;
      }
    });
  }
}

function checkLoginPassword() {
  const inputEmail = loginEmail.value.trim();
  const inputPassword = loginPassword.value.trim();
  if (inputPassword == "") {
    setError(loginPassword, errorEmptyPassword);
    return false;
  } else {
    setValid(loginPassword);
    return true;
  }
}

function loginPlayer() {
  event.preventDefault();

  const inputEmail = loginEmail.value.trim();
  const inputPassword = loginPassword.value.trim();
  let correctEmail = checkLoginEmail();
  let correctPassword = checkLoginPassword();
  if (correctEmail && correctPassword) {
    checkEmailPasswordMatch(inputEmail, inputPassword).then(function (res) {
      if (res) {
        const usernamePromise = getUsername(`${inputEmail}`);
        usernamePromise.then(function (username) {
          window.localStorage.setItem("currentUser", username);
          window.location.href = "game.html";
        });
        // getUserByEmail(`${inputEmail}`).then(function (user) {
        //   window.localStorage.setItem("currentUser", "r");
        // });
        setDefault(loginEmail);
        setDefault(loginPassword);
      } else {
        setError(loginPassword, errorIncorrectPassword);
      }
    });
  } else {
    setDefault(loginEmail);
    setDefault(loginPassword);
  }
}

// REGISTER UTILS
// Register buttons:
const registerButton = document.getElementById("register-submit");
const registerUsername = document.getElementById("register-username");
const registerEmail = document.getElementById("register-email");
const registerPassword = document.getElementById("register-password");
const registerConfirmPassword = document.getElementById(
  "register-confirm-password"
);

registerUsername.addEventListener("change", (event) => {
  event.preventDefault();
  checkUsername();
});

registerEmail.addEventListener("change", (event) => {
  event.preventDefault();
  checkEmail();
});

registerPassword.addEventListener("change", (event) => {
  event.preventDefault();
  checkPassword();
});

registerConfirmPassword.addEventListener("change", (event) => {
  event.preventDefault();
  checkPasswordConfirmation();
});

registerButton.addEventListener("click", registerPlayer);

async function checkEmailDuplication(inputEmail) {
  return getUserByEmail(`${inputEmail}`).then(function (user) {
    if (user.email === `${inputEmail}`) {
      return true;
    }
    return false;
  });
}

function checkPassword() {
  let inputPassword = registerPassword.value.trim();
  if (inputPassword.length < 5) {
    setError(registerPassword, errorPasswordLength);
    return false;
  } else {
    setValid(registerPassword);
    return true;
  }
}

function checkPasswordConfirmation() {
  let correctPassword = checkPassword();
  let inputPassword = registerPassword.value.trim();
  let inputConfirmPassword = registerConfirmPassword.value.trim();
  if (!correctPassword || inputPassword !== inputConfirmPassword) {
    setError(registerConfirmPassword, errorPasswordConfirmation);
    return false;
  } else {
    setValid(registerConfirmPassword);
    return true;
  }
}

function checkUsername() {
  let inputUsername = registerUsername.value.trim();
  if (inputUsername == "") {
    setError(registerUsername, errorBlankUsername);
    return false;
  } else {
    setValid(registerUsername);
    return true;
  }
}

function checkEmail() {
  let inputEmail = registerEmail.value.trim();
  if (inputEmail == "") {
    setError(registerEmail, errorBlankEmail);
    return false;
  }
  if (validateEmail(inputEmail) === false) {
    setError(registerEmail, errorInvalidEmail);
    return false;
  } else {
    return checkEmailDuplication(inputEmail).then(function (res) {
      if (res === true) {
        setError(registerEmail, errorDuplicateEmail);
        return false;
      } else {
        setValid(registerEmail);
        return true;
      }
    });
  }
}

function registerPlayer() {
  event.preventDefault();

  let correctUsername = checkUsername();
  let correctEmail = checkEmail();
  let correctPassword = checkPassword();
  let correctConfirmation = checkPasswordConfirmation();
  if (
    correctEmail &&
    correctUsername &&
    correctPassword &&
    correctConfirmation
  ) {
    const username = registerUsername.value.trim();
    const email = registerEmail.value.trim();
    const password = registerPassword.value.trim();
    writeNewUserData(username, email, password);
    window.localStorage.setItem("currentUser", username);
    window.location.href = "game.html";

    setDefault(registerUsername);
    setDefault(registerEmail);
    setDefault(registerPassword);
    setDefault(registerConfirmPassword);
  }
}

// UI UTILS
const registerActionButton = document.getElementById("registerAction");
const loginActionButton = document.getElementById("loginAction");
const container = document.getElementById("container");

registerActionButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

loginActionButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});
