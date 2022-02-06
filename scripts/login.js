var database = window.localStorage
var currentUser = "currentUser"
database.setItem(currentUser, "")

// ERROR MESSAGES:
// Login error messages
const errorEmptyEmail = 'PLEASE ENTER E-MAIL'
const errorInvalidEmail = 'EMAIL IS NOT VALID'
const errorNonRegisteredEmail = 'E-MAIL IS NOT REGISTERED YET'
const errorEmptyPassword = 'PLEASE ENTER PASSWORD'
const errorIncorrectPassword = 'PASSWORD IS NOT CORRECT'
// Register error messages
const errorBlankUsername = 'USERNAME CANNOT BE BLANK'
const errorBlankEmail = 'EMAIL CANNOT BE BLANK'
const errorDuplicateEmail = 'THIS EMAIL ALREADY EXISTS'
const errorPasswordLength = 'PASSWORD MUST BE AT LEAST 5 SYMBOLS'
const errorPasswordConfirmation = 'PASSWORD DOES NOT MATCH'

// LOGIN UTILS:
// Login buttons:
const loginButton = document.getElementById('login-submit')
const loginEmail = document.getElementById('login-email')
const loginPassword = document.getElementById('login-password')

loginEmail.addEventListener('change', event => {
    event.preventDefault()
    checkLoginEmail()
})

loginPassword.addEventListener('change', event => {
    event.preventDefault()
    checkLoginPassword()
})

loginButton.addEventListener('click', loginPlayer)

function loginPlayer() {
    event.preventDefault()

    const inputEmail = loginEmail.value.trim();
    const inputPassword = loginPassword.value.trim();
    let correctEmail = checkLoginEmail()
    let correctPassword = checkLoginPassword()
    if(correctEmail && correctPassword){
        if(checkEmailPasswordMatch(inputEmail, inputPassword)){
            const user = JSON.parse(database.getItem(`${inputEmail}`));
            database.setItem(currentUser, user[0])
            window.location.href = "game.html"
            setDefault(loginEmail)
            setDefault(loginPassword)
        }
        else{
            setError(loginPassword, errorIncorrectPassword)
        }
    }
    else{
        setDefault(loginEmail)
        setDefault(loginPassword)
    }
}

function checkLoginEmail() {
    let inputEmail = loginEmail.value.trim()
    if(inputEmail == '') {
        setError(loginEmail, errorEmptyEmail)
        return false
    }
    if(validateEmail(inputEmail) === false){
        setError(loginEmail, errorInvalidEmail)
        return false
    }
    if(checkEmailExistence(inputEmail) === false){
        setError(loginEmail, errorNonRegisteredEmail)
        return false
    }
    else {
        setValid(loginEmail)
        return true
    }
}

function  checkLoginPassword() {
    const inputEmail = loginEmail.value.trim();
    const inputPassword = loginPassword.value.trim();
    if(inputPassword == '') {
        setError(loginPassword, errorEmptyPassword)
        return false
    }
    else {
        setValid(loginPassword)
        return true
    }
}

function checkEmailPasswordMatch(inputEmail, inputPassword) {
    const user = JSON.parse(database.getItem(`${inputEmail}`));
    if ((user[1] === inputEmail) && (user[2] === inputPassword)) {
        return true;
    }
    return false;
}

function checkEmailExistence(inputEmail){
    if (database.getItem(`${inputEmail}`) === null) {
        return false; 
    }
    return true; 
}

// REGISTER UTILS
// Register buttons:
const registerButton = document.getElementById('register-submit')
const registerUsername = document.getElementById('register-username')
const registerEmail = document.getElementById('register-email')
const registerPassword = document.getElementById('register-password')
const registerConfirmPassword = document.getElementById('register-confirm-password')

const allInputs = [registerUsername, registerEmail, registerPassword, registerConfirmPassword] 

registerUsername.addEventListener('change', event => {
    event.preventDefault()
    checkUsername() 
});

registerEmail.addEventListener('change', event => {
    event.preventDefault()
    checkEmail() 
});

registerPassword.addEventListener('change', event => {
    event.preventDefault()
    checkPassword()
})

registerConfirmPassword.addEventListener('change', event =>{
    event.preventDefault()
    checkPasswordConfirmation()
})

registerButton.addEventListener('click', registerPlayer)

function registerPlayer() {
    event.preventDefault();

    let correctUsername = checkUsername()
    let correctEmail = checkEmail()
    let correctPassword = checkPassword()
    let correctConfirmation = checkPasswordConfirmation()
    if(correctEmail && correctUsername &&
        correctPassword && correctConfirmation){
        const username = registerUsername.value.trim();
        const email = registerEmail.value.trim();
        const password = registerPassword.value.trim();
        database.setItem(email, JSON.stringify([username, email, password]));

        setDefault(registerUsername)
        setDefault(registerEmail)
        setDefault(registerPassword)
        setDefault(registerConfirmPassword)
    }
}

function checkUsername() {
    let inputUsername = registerUsername.value.trim()
    if(inputUsername == '') {
        setError(registerUsername, errorBlankUsername)
        return false
    }
    else {
        setValid(registerUsername)
        return true
    }
}

function checkEmail() {
    let inputEmail = registerEmail.value.trim()
    if(inputEmail == '') {
        setError(registerEmail, errorBlankEmail)
        return false
    }
    if(validateEmail(inputEmail) === false){
        setError(registerEmail, errorInvalidEmail)
        return false
    }
    if(checkEmailDuplication(inputEmail) === true){
        setError(registerEmail, errorDuplicateEmail)
        return false
    }
    else {
        setValid(registerEmail)
        return true
    }
}

function checkPassword() {
    let inputPassword = registerPassword.value.trim()
    if (inputPassword.length < 5) {
        setError(registerPassword, errorPasswordLength)
        return false
    }
    else {
        setValid(registerPassword)
        return true
    }
}

function checkPasswordConfirmation() {
    let correctPassword = checkPassword()
    let inputPassword = registerPassword.value.trim()
    let inputConfirmPassword = registerConfirmPassword.value.trim()
    if (!correctPassword || inputPassword !== inputConfirmPassword) {
        setError(registerConfirmPassword, errorPasswordConfirmation);
        return false
    }
    else {
        setValid(registerConfirmPassword);
        return true
    }
}

function checkEmailDuplication(inputEmail){
    if (database.getItem(`${inputEmail}`) === null) {
        return false; 
    }
    return true; 
}

// COMMON UTILS
function setError(item, message) {
    const itemParent = item.parentElement
    const errorItem = itemParent.querySelector('small')

    errorItem.innerHTML = `${message}`

    item.classList.add('error')
    item.classList.remove('valid')
    item.classList.remove('neonBoxes')
}

function setValid(item) {
    const itemParent = item.parentElement
    const errorItem = itemParent.querySelector('small')

    errorItem.innerHTML = ``

    item.classList.add('valid')
    item.classList.remove('error')
    item.classList.remove('neonBoxes')
}

function setDefault(item){
    const itemParent = item.parentElement
    const errorItem = itemParent.querySelector('small')
    
    item.value = ''
    errorItem.innerHTML = ``
    item.classList.remove('valid')
    item.classList.add('neonBoxes')
}
function validateEmail(input)
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)){
    return (true)
  }
    return (false)
}

// UI UTILS
const registerActionButton = document.getElementById('registerAction');
const loginActionButton = document.getElementById('loginAction');
const container = document.getElementById('container');

registerActionButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

loginActionButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});