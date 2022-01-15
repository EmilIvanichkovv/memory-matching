var database = window.localStorage

const errorBlankUsername = 'USERNAME CANNOT BE BLANK'
const errorBlankEmail = 'EMAIL CANNOT BE BLANK'
const errorInvalidEmail = 'EMAIL IS NOT VALID'
const errorDuplicateEmail = 'THIS EMAIL ALREADY EXISTS'
const errorPasswordLength = 'PASSWORD MUST BE AT LEAST 5 SYMBOLS'
const errorPasswordConfirmation = 'PASSWORD DOES NOT MATCH'

const registerButton = document.getElementById('register-submit')
const registerUsername = document.getElementById('register-username')
const registerEmail = document.getElementById('register-email')
const registerPassword = document.getElementById('register-password')
const registerConfirmPassword = document.getElementById('register-confirm-password')

const allInputs = [registerUsername, registerEmail, registerPassword, registerConfirmPassword  ] 

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
    item.value = ''
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