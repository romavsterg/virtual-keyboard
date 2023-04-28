const body = document.querySelector(`body`)

const winEngKeys = [['`', '`'], ['!', '1'], ['@', '2'], ['#', '3'], ['$', '4'], ['%', '5'], ['^', '6'], ['&', '7'], ['*', '8'], ['(', '9'], [')', '0'], ['_', '-'], ['+', '='], 'Backspace']
const winEngAuxiliaryKeys = ['Control', 'Shift', 'CapsLock','CapsLock', 'Tab']

const pressedKeys = []

body.innerHTML += `<textarea class="input-result"></textarea>`

body.innerHTML += `<div class="keyboard-container"></div>`
let input = document.querySelector('.input-result')

document.addEventListener('keydown', (key)=>{
    console.log('pressed key', key)

    if (key.key === 'Tab') {
        input.textContent += '  '
    } else if (!winEngAuxiliaryKeys.includes(key.key)) {
        input.textContent += key.key
    }
})