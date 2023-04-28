const body = document.querySelector(`body`)

const checkKey = (key) => {
    switch (key){
        case 'Space':
            input.value += ' '
            break
        case 'Tab':
            input.value += '\t'
            break
        case 'CapsLock':
            capsMode = !capsMode
            document.querySelectorAll('.key').forEach((keyButton)=>{
                if (keyButton.textContent == 'CapsLock') {
                    keyButton.classList.toggle('capsMode')
                }
            })
            console.log('caps lock:',capsMode)
            document.querySelectorAll('.key').forEach((elem)=>{
                if (!elem.classList.contains('wide-key')) {
                    elem.textContent = capsMode? elem.textContent.toUpperCase() : elem.textContent.toLowerCase()
                }
            })
            break
        case 'Backspace':
            let inputText = input.value.split('')
            inputText.pop()
            input.value = inputText.join('')
            break
        case 'ControlLeft':
        case 'Win':
        case 'AltLeft':
        case 'AltRight':
        case 'ControlRight':
        case '←':
        case '↓':
        case '→':
        case 'ShiftRight':
        case 'ShiftLeft':
        case 'Enter':
            break
        case 'Space':
            input.value += ' '
            break
        default:
            input.value += key
            break
    }
}

const winEngKeys = [['`',        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
                    ['Tab',      'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
                    ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', "'"],
                    ['ShiftLeft',    'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'ShiftRight'],
                    ['ControlLeft', 'Win', 'AltLeft', 'Space', 'AltRight', 'ControlRight', '←', '↓', '→']]

const winEngAuxiliaryKeys = ['ControlLeft', 'Win', 'AltLeft', 'Space', 'AltRight', 'ControlRight', '←', '↓', '→','ShiftLeft','ShiftRight', 'Backspace', 'Tab','CapsLock']

let capsMode = false

const pressedKeys = []

body.innerHTML += `<textarea class="input-result">${localStorage.getItem('inputValue')}</textarea>`

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
        checkKey(key)
    }
})

window.addEventListener('beforeunload', ()=>{localStorage.setItem('inputValue', input.value)})

document.addEventListener('keydown', (key)=>{
    keyboard.querySelectorAll('.key').forEach((keyButton)=>{
        if (keyButton.textContent == (key.key.replace(/\s/g, 'Space').length == 1 ? key.key : key.code)) {
            keyButton.classList.add('pressed-key')
            checkKey((key.key.replace(/\s/g, 'Space').length == 1 ? key.key : key.code))
        }
    })
    
})

document.addEventListener('keyup', (key)=>{
    keyboard.querySelectorAll('.key').forEach((keyButton)=>{
        if (keyButton.textContent == (key.key.length == 1 ? key.key : key.code)) {
            keyButton.classList.remove('pressed-key')
        }
    })
})

//     if (key.key === 'Tab') {
//         input.textContent += '  '
//     } else if (!winEngAuxiliaryKeys.includes(key.key)) {
//         input.textContent += key.key
//     }
// })