var database = window.localStorage

const loginButton = document.getElementById('login-submit')
const loginEmail = document.getElementById('login-email')
const loginPassword = document.getElementById('login-password')

const errorEmptyEmail = 'PLEASE ENTER E-MAIL'
const errorInvalidEmail = 'EMAIL IS NOT VALID'
const errorNonRegisteredEmail = 'E-MAIL IS NOT REGISTERED YET'
const errorEmptyPassword = 'PLEASE ENTER PASSWORD'
const errorIncorrectPassword = 'PASSWORD IS NOT CORRECT'

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