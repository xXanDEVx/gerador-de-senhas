const button = document.getElementById('btn')
const passwordArea = document.getElementById('passwordArea')
const listCheckboxItems = document.getElementsByClassName('option')
const areaGenerate = document.getElementById('areaGenerate')
const getError = document.getElementById('messageError')
const copyText = document.getElementById('btnClipboard')
const getListOptions = () => Array.from(listCheckboxItems)
const alphabet = getAlphabet()
const simbolos = getSpecialChar()


function getAlphabet() {
    const indexOfAnsciiLetters = 65; const getLetter = index => String.fromCharCode(index + indexOfAnsciiLetters)

    return Array.from({ length: 26 }, (_, index) => getLetter(index))
}

function getSpecialChar() {
    const indexOfAnsciiLetters = 33; const getLetter = index => String.fromCharCode(index + indexOfAnsciiLetters)

    return Array.from({ length: 15 }, (_, index) => getLetter(index))
}

function getIndexRand(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function renderGeneratedPassword(pass = []) {
    const password = pass.reduce((acc, num) => acc + num.toString(), '');
    passwordArea.value = password
}

function getPassword(options = {}) {
    const {
        shouldUseLetters = false,
        shouldUseNumbers = false,
        shouldUseSpecialChars = false,
    } = options

    const gerador = []

    const randomLetter = () => alphabet[getIndexRand(0, alphabet.length)]
    const randomNumber = () => getIndexRand(0, 9)
    const randomChar = () => simbolos[getIndexRand(0, simbolos.length)]

    if (shouldUseLetters) gerador.push(randomLetter)
    if (shouldUseNumbers) gerador.push(randomNumber)
    if (shouldUseSpecialChars) gerador.push(randomChar)

    const indexAleatorio = getIndexRand(0, gerador.length)
    const geradorFn = gerador[indexAleatorio]

    return geradorFn()
}

function generatePassword(options = {}) {
    const {
        shouldUseLetters = false,
        shouldUseNumbers = false,
        shouldUseSpecialChars = false,
    } = options
    // Tua lógica aqui

    const senha = []
    let lastPass;
    while (senha.length < 12) {
        const nextPass = getPassword(options)

        if (lastPass !== nextPass) {
            senha.push(nextPass)
            lastPass = nextPass
        }
    }
    return senha
}

function showError(message, className) {
    getError.style.display = "block"
    getError.innerText = message;
    getError.classList = className
}

function checkIsUndefined(options) {
    const isValidOptionByKey = (key) => Boolean(options[key])
    const existsValidOption = Object.keys(options).some(isValidOptionByKey)

    return existsValidOption
}

function checkOptions(listOptions = {}) {
    const parsedOptions = {
        shouldUseNumbers: false,
        shouldUseLetters: false,
        shouldUseSpecialChars: false,
    }
    const dicionary = {
        numbers: 'shouldUseNumbers',
        letters: 'shouldUseLetters',
        'special-characters': 'shouldUseSpecialChars'
    }

    for (const item of listOptions) {
        const itemName = dicionary[item.name]
        parsedOptions[itemName] = item.checked
    }

    if (!checkIsUndefined(parsedOptions)) {
        return
    }
    return parsedOptions
}

button.addEventListener('click', () => {
    // Tua lógica aqui
    const listOptions = getListOptions()
    const options = checkOptions(listOptions)
    if(typeof options === 'undefined') {
        showError('Escolha algum campo!', 'error')
        copyText.setAttribute('disabled', '')
        passwordArea.value = ""
    } else {
        showError('Senha Gerada!', "warning")
        copyText.removeAttribute('disabled')
        const generatedPassword = generatePassword(options)
        renderGeneratedPassword(generatedPassword)
    }
})

copyText.addEventListener('click', () => {
    navigator.clipboard.writeText(passwordArea.value)
    showError('Texto copiado!', "warning")
})