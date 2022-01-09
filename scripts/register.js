var database = window.localStorage

const errorBlankUsername = 'USERNAME CANNOT BE BLANK'
const errorDuplicateUsername = 'THIS USERNAME ALREADY EXISTS'

const registerButton = document.getElementById('register-submit')
const registerUsername = document.getElementById('register-username')
const registerEmail = document.getElementById('register-email')
const registerPassword = document.getElementById('register-password')
const registerConfirmPassword = document.getElementById('register-confirm-password')

registerUsername.addEventListener('change', event => {
    event.preventDefault();
    checkUsername(); // validatation and style
});

registerButton.addEventListener('click', registerPlayer)

function registerPlayer() {
    event.preventDefault();

    checkUsername()
    const username = registerUsername.value.trim();
    const email = registerEmail.value.trim();
    const password = registerPassword.value.trim();
    database.setItem(username, email, JSON.stringify([username, email, password]));

    registerUsername.value = ''
    registerEmail.value = ''
    registerPassword.value = ''
    registerConfirmPassword.value = ''
}

function checkUsername() {
    let inputUsername = registerUsername.value.trim()
    if(inputUsername == '') {
        setError(registerUsername, errorBlankUsername)
    }
    else if(checkUsernameDuplication(inputUsername) === true) {
        setError(registerUsername, errorDuplicateUsername)
    }
    else {
        setValid(registerUsername)
    }
}

function checkUsernameDuplication(inputUsername){
    if (database.getItem(`${inputUsername}`) === null) {
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
