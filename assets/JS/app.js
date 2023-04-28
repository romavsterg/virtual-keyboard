const body = document.querySelector(`body`)

// const winEngKeys = [[['`', '`'], ['!', '1'], ['@', '2'], ['#', '3'], ['$', '4'], ['%', '5'], ['^', '6'], ['&', '7'], ['*', '8'], ['(', '9'], [')', '0'], ['_', '-'], ['+', '='], 'Backspace']]
const winEngKeys = [['`',        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
                    ['Tab',      'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
                    ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'k', 'l', "'"],
                    ['Shift',    'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '^', 'Shift'],
                    ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '<', 'v', '>']]

const winEngAuxiliaryKeys = ['Ctrl', 'Shift', 'CapsLock','CapsLock', 'Tab', 'Backspace', 'Win', 'Space', 'Alt', 'v', '<', '>', '^']

let capsMode = false

const pressedKeys = []

body.innerHTML += `<textarea class="input-result"></textarea>`

body.innerHTML += `<div class="keyboard-container"></div>`
const keyboard = document.querySelector(`.keyboard-container`)

let input = document.querySelector('.input-result')

winEngKeys.forEach((keyRow)=>{
    let row = document.createElement('div')
    row.classList.add('row')
    keyboard.appendChild(row)
    keyRow.forEach((key)=>{
        let keyButton = document.createElement('button')
        keyButton.classList.add('key')
        if (winEngAuxiliaryKeys.includes(key)) {keyButton.classList.add('wide-key')}
        if (key == 'Space') {keyButton.classList.add('space-key')}
        keyButton.textContent = key
        row.appendChild(keyButton)
    })
})

document.addEventListener('click', (target) => {
    if (target.target.classList.contains('key')) {
        let key = target.target.textContent
        console.log('pressed key', key)
        switch (key){
            case 'Space':
                input.textContent += ' '
                break
            case 'Tab':
                input.textContent += '\t'
                break
            case 'CapsLock':
                capsMode = !capsMode
                target.target.classList.toggle('capsMode')
                console.log('caps lock:',capsMode)
                document.querySelectorAll('.key').forEach((elem)=>{
                    if (!elem.classList.contains('wide-key')) {
                        elem.textContent = capsMode? elem.textContent.toUpperCase() : elem.textContent.toLowerCase()
                    }
                    console.log('das')
                })
                break
            default:
                input.textContent += key
                break
        }
    }
})

// document.addEventListener('keydown', (key)=>{
//     console.log('pressed key', key)})

//     if (key.key === 'Tab') {
//         input.textContent += '  '
//     } else if (!winEngAuxiliaryKeys.includes(key.key)) {
//         input.textContent += key.key
//     }
// })